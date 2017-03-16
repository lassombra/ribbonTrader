import React from 'react';
import Login from './login';
import query from './home.graphql';
import {graphql} from 'react-apollo';
import './home.scss';

@graphql(query)
export default class Home extends React.Component {
	render() {
		return <div>
			<h1>Ribbon Trader <Login /></h1>
			{this.props.data.getRibbons ? <div>
				<h2>There are <small>{this.props.data.getRibbons.count}</small> ribbons listed</h2>
					<table>
						<caption>Most recent ribbons</caption>
						<thead>
							<tr>
								<th>title</th>
								<th>description</th>
								<th>Availability</th>
								<th>Posted by</th>
							</tr>
						</thead>
						<tbody>
						{this.props.data.getRibbons.ribbons.map(ribbon => <tr key={ribbon.id}>
							<td>{ribbon.title}</td>
							<td>{ribbon.description}</td>
							<td>{ribbon.Tags.map(tag => tag.description).join(', ')}</td>
							<td>{ribbon.Owner.name}</td>
						</tr>)}
						</tbody>
					</table>
			</div> : null}
		</div>;
	}
}