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
		newRibbon(root, {ribbon}) {
			delete ribbon.id;
			return Database.Ribbon.create(ribbon);
		}
	}
};