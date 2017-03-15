import {Database} from 'database/server';
import getDBUser from 'google/getDBUser';
export const types = [`type CurrentUser {
	id: Int!
	googlePicture: String!
	name: String!
	admin: Boolean!
	displayedName: String
	sched: String
	ribbons: [Ribbon!]!
}`, `input CurrentUserInput {
	displayedName: String
	sched: String
}`, `type User {
	id: Int!
	googlePicture: String!
	sched: String
	name: String!
	ribbons: [Ribbon!]!
}`];
export const query = [
	`getCurrentUser: CurrentUser`,
	`getUser(id: Int!): User`
];
export const mutation = [
	`updateCurrentUser(currentUser: CurrentUserInput): CurrentUser`,
];
export const resolvers = {
	User: {
		name(user) {
			return user.displayedName || user.name;
		},
		ribbons(user) {
			return Database.Ribbon.findAll({
				include: [{
					model: Database.User,
					as: 'Owner',
					where: {id: user.id}
				}, Database.Tag],
				subQuery: false
			});
		}
	},
	CurrentUser: {
		ribbons(user) {
			return Database.Ribbon.findAll({
				include: [{
					model: Database.User,
					as: 'Owner',
					where: {id: user.id}
				}, Database.Tag],
				subQuery: false
			});
		}
	},
	Query: {
		getCurrentUser(root, args, context) {
			return getDBUser(context);
		},
		getUser(root, {id}) {
			return Database.User.findOne({where:{id}});
		}
	},
	Mutation: {
		updateCurrentUser(root, {currentUser}, context) {
			return getDBUser(context)
				.then(activeUser => activeUser && activeUser.update(currentUser));
		}
	}
};