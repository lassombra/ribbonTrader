import schema from 'schema/server';
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress} from 'graphql-server-express';
import { graphiqlExpress } from 'graphql-server-express';

const PORT=3000;
const GraphQLOptions = {
	schema,
	// values to be used as context and rootValue in resolvers
	debug: true
};

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress(GraphQLOptions));
app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}));
app.listen(PORT);