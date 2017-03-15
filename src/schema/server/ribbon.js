import {Database} from 'database/server';
import getDBUser from 'google/getDBUser';
export const types = [
`type PagedRibbons {
	count: Int!
	ribbons: [Ribbon!]!
}`, `type Ribbon {
	id: Int!
	image: String
	description: String!
	title: String!
	Owner: User!
	Tags: [Tag!]!
}`, `input RibbonInput {
	id: Int
	image: String
	description: String!
	title: String!
	Tags: [TagInput!]!
}`,`type Tag {
	id: Int!
	description: String!
}`, `input TagInput {
	id: Int!
	description: String
}`];
export const query = [
	`getRibbon(id: Int!): Ribbon`,
	`getRibbons(page: Int): PagedRibbons!`,
	`getTags: [Tag!]!`,
	`findRibbons(search: String, Tags: [TagInput!], page: Int): PagedRibbons!`
];
export const mutation = [
	`newOrUpdatedRibbon(ribbon: RibbonInput!): Ribbon!`,
	`deleteRibbon(id: Int!): Boolean!`
];
export const resolvers = {
	Ribbon: {
		Owner(ribbon) {
			return ribbon.Owner || ribbon.getOwner();
		},
		Tags(ribbon) {
			return ribbon.availabilityTypes || ribbon.getAvailabilityTypes();
		}
	},
	Query: {
		getRibbon(root, {id}) {
			return Database.Ribbon.findOne({where: {id}, include: [{
				model: Database.User,
				as: 'Owner'
			}, Database.Tag], subQuery: false});
		},
		getRibbons(root, {page}) {
			page = page || 0;
			return {
				count: Database.Ribbon.count(),
				ribbons: Database.Ribbon.findAll({
					offset: 25 * page,
					limit: 25,
					order: [['updatedAt','DESC']],
					include: [{
						model: Database.User,
						as: 'Owner'
					}, Database.Tag],
					subQuery: false
				})
			};
		},
		findRibbons(root, {search, Tags, page}){
			page = page || 0;
			let options = {subQuery: false};
			if (search) {
				options.where = {$or: [
					{title: {$like: `%${search}%`}},
					{description: {$like: `%${search}%`}}
				]};
			}
			if (Tags) {
				options.include = [{
					model: Database.Tag,
					where: {id: {$in: Tags.map(tag => tag.id)}}
				}];
			}
			let count = Database.Ribbon.count(options);
			options.offset = page * 25;
			options.limit = 25;
			options.order = [['updatedAt','DESC']];
			if (Tags) {
				options.include.push({
					model: Database.User,
					as: 'Owner'
				});
			} else {
				options.include = [{all: true}];
			}
			let ribbons = Database.Ribbon.findAll(options);
			return {
				count,
				ribbons
			};
		},
		getTags() {
			return Database.Tag.findAll();
		}
	},
	Mutation: {
		async newOrUpdatedRibbon(root, {ribbon}, context) {
			let dbUser = await getDBUser(context);
			if (!dbUser) {
				throw 'can\'t create ribbon without an authenticated user';
			}
			let dbRibbon;
			let tags = Promise.all(ribbon.Tags.map(tag => Database.Tag.findOne({where:{id: tag.id}})));
			if (ribbon.id) {
				dbRibbon = await Database.Ribbon.findOne({where: {id: ribbon.id}});
				if (dbRibbon) {
					let owner = await dbRibbon.getOwner();
					if (owner.id !== dbUser.id) {
						throw "can't modify someone else's ribbon";
					}
				}
			}
			tags = await tags;
			dbRibbon = dbRibbon ? await (dbRibbon.update(ribbon, {save: false})) : Database.Ribbon.build(ribbon);
			dbRibbon.setOwner(dbUser, {save: false});
			dbRibbon = await dbRibbon.save();
			await dbRibbon.setAvailabilityTypes(tags);
			dbRibbon = await dbRibbon.save();
			return await Database.Ribbon.findOne({where: {id: dbRibbon.id}, include: [{all: true}]});
		},
		async deleteRibbon(root, {id}, context) {
			let dbUser = await getDBUser(context);
			if (!dbUser) return false;
			let dbRibbon = await Database.Ribbon.findOne({where: {id}});
			if (!dbRibbon || dbRibbon.OwnerId != dbUser.id) return false;
			let count = await dbRibbon.destroy();
			return !!count;
		}
	}
};