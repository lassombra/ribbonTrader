import {merge} from 'lodash';
import * as Ribbon from './ribbon';
import * as User from './user';
import {makeExecutableSchema} from 'graphql-tools';

let query = [...Ribbon.query, ...User.query];
let mutation = [...Ribbon.mutation, ...User.mutation];
let resolvers = merge({}, Ribbon.resolvers, User.resolvers);
let types = [...Ribbon.types, ...User.types];

query = query.map(field => '\t'+field);
query = 'type Query {\n'+query+'\n}';

mutation = mutation.map(field => '\t'+field);
mutation = 'type Mutation {\n'+mutation+'\n}';

types.push(query, mutation, 'schema {\n\tquery: Query\n\tmutation: Mutation\n}');

export default makeExecutableSchema({
	typeDefs: types,
	resolvers
});