import {Database} from 'database/server';
export const types = [`type Ribbon {
	id: Int!
	image: String
	description: String
}`, `input RibbonInput {
	id: Int
	image: String
	description: String
}`];
export const query = [
	`getRibbon(id: Int!): Ribbon`,
	`getRibbons: [Ribbon!]!`
];
export const mutation = [
	`newRibbon(ribbon: RibbonInput!): Ribbon!`,
];
export const resolvers = {
	Query: {
		getRibbon(root, {id}) {
			return Database.Ribbon.findOne({where: {id}});
		},
		getRibbons() {
			return Database.Ribbon.findAll();
		}
	},
	Mutation: {
		async newRibbon(root, {ribbon}, {user}) {
			console.log(ribbon);
			delete ribbon.id;
			if (!user) {
				throw 'can\'t create ribbon without user';
			}
			let dbUser = await Database.User.findOne({googleKey: user.id});
			if (!dbUser) {
				throw 'can\'t create ribbon because user not in database';
			}
			let dbRibbon = await Database.Ribbon.build(ribbon);
			await dbRibbon.setOwner(dbUser);
			await dbRibbon.save();
			return dbRibbon;
		}
	}
};