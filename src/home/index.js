import React from 'react';
import {graphql} from 'react-apollo';
import query from './list.graphql';
import mutation from './create.graphql';
import Handler from 'handler';
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import fetch from 'isomorphic-fetch';

function graphQLFetcher(graphQLParams) {
	return fetch(window.location.origin + '/graphql', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(graphQLParams),
	}).then(response => response.json());
}


@graphql(query)
@graphql(mutation)
export default class Home extends React.Component {
	render() {
		return <div>
			<h1>Ribbon Trader</h1>
			{this.props.data.getRibbons ? <table>
					<thead><tr><th>id</th><th>description</th></tr></thead>
					<tbody>
					{this.props.data.getRibbons.map(ribbon => <tr key={ribbon.id}>
						<td>{ribbon.id}</td>
						<td>{ribbon.description}</td>
					</tr>)}
					</tbody>
				</table> : null}
			<form onSubmit={this.newRibbon}>
				<input name="description" />
				<button type="subit">Add ribbon</button>
			</form>
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