import _ from 'underscore';
import * as Ribbon from './ribbon';
import {makeExecutableSchema} from 'graphql-tools';

let query = [...Ribbon.query];
let mutation = [...Ribbon.mutation];
let resolvers = _.extend({}, Ribbon.resolvers);
let types = [...Ribbon.types];

query = query.map(field => '\t'+field);
query = 'type Query {\n'+query+'\n}';

mutation = mutation.map(field => '\t'+field);
mutation = 'type Mutation {\n'+mutation+'\n}';

types.push(query, mutation, 'schema {\n\tquery: Query\n\tmutation: Mutation\n}');

export default makeExecutableSchema({
	typeDefs: types,
	resolvers
});