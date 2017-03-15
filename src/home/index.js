import React from 'react';
import {graphql} from 'react-apollo';
import query from './list.graphql';
import mutation from './create.graphql';
import Handler from 'handler';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import fetch from 'isomorphic-fetch';
import Login from './login';
import loadGAuth from 'google/google-api';

let GAuth = loadGAuth();

async function graphQLFetcher(graphQLParams) {
	return GAuth.then((authFunc) => {
		const auth = authFunc();
		const token = auth.currentUser.get().getAuthResponse().id_token;
		return token || null;
	}).then(token => {
		let headers = {'Content-Type': 'application/json'};
		if (token) {
			headers.authorization = token;
		}
		return fetch(window.location.origin + '/graphql', {
			method: 'post',
			headers,
			body: JSON.stringify(graphQLParams),
		})
	}).then(response => response.json());
}


export default class Home extends React.Component {
	render() {
		return <div>
			<h1>Ribbon Trader <Login /></h1>
			<GraphiQL fetcher={graphQLFetcher} />
		</div>;
	}
	@Handler
	newRibbon(event) {
		let formData = new FormData(event.currentTarget);
		this.props.mutate(
			{
				variables: {
					ribbon: {description: formData.get('description')}
				}
			}
		).then(() => {
			this.props.data.refetch();
		});
		event.preventDefault();
	}
}