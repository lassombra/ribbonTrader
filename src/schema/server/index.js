import {merge} from 'lodash';
import * as Ribbon from './ribbon';
import {makeExecutableSchema} from 'graphql-tools';

let query = [...Ribbon.query, 'currentUser: User'];
let mutation = [...Ribbon.mutation];
let resolvers = merge({}, Ribbon.resolvers, {Query: {currentUser: (root, args, context) => context && context.user}});
let types = [...Ribbon.types, `type User {
	id: String
	name: String
	image: String
}`];

query = query.map(field => '\t'+field);
query = 'type Query {\n'+query+'\n}';

mutation = mutation.map(field => '\t'+field);
mutation = 'type Mutation {\n'+mutation+'\n}';

types.push(query, mutation, 'schema {\n\tquery: Query\n\tmutation: Mutation\n}');

export default makeExecutableSchema({
	typeDefs: types,
	resolvers
});