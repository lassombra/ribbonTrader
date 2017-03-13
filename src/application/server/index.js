import schema from 'schema/server';
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress} from 'graphql-server-express';
import { graphiqlExpress } from 'graphql-server-express';
import fs from 'fs';
import path from 'path';

const PORT=3000;
const GraphQLOptions = {
	schema,
	// values to be used as context and rootValue in resolvers
	debug: true
};
let manifest;
fs.readFile(path.resolve('./.client/manifest.json'), 'utf-8', (error, result) => {
	if (!error) {
		manifest = JSON.parse(result);
	}
});

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress(GraphQLOptions));
app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}));
app.use('/webapp/', express.static(path.resolve('./.client')));
app.use('/', function(req, res) {
	res.send(`<!doctype>
<html>
	<head>
		<link rel="stylesheet" href="/webapp/${manifest['app.css']}">
	</head>
	<body>
		<div id="appTarget"></div>
		<script src="/webapp/${manifest['app.js']}"></script>
	</body>
</html>`)
});
app.listen(PORT);