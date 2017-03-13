import schema from 'schema/server';
import express from 'express';
import bodyParser from 'body-parser';
import {graphqlExpress} from 'graphql-server-express';
import { graphiqlExpress } from 'graphql-server-express';
import fs from 'fs';
import path from 'path';
import googleUserVerify from 'google/googleUserVerify';

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

async function options(req) {
	let options = {...GraphQLOptions};
	if (req.headers.authorization) {
		let user = await googleUserVerify(req.headers.authorization);
		options.context = {user};
	}
	return options;
}

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress(options));
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