import {Ribbon} from 'database/server/models/ribbon';
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
			return Ribbon.findOne({where: {id}});
		},
		getRibbons() {
			return Ribbon.findAll();
		}
	},
	Mutation: {
		newRibbon(root, {ribbon}) {
			delete ribbon.id;
			return Ribbon.create(ribbon);
		}
	}
};