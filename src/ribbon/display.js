import React from 'react';
import query from './display.graphql';
import {graphql} from 'react-apollo';

@graphql(query, {options: props => ({variables: {ribbon: props.id}})})
export default class DisplayRibbon extends React.Component{
	render() {
		let ribbon = this.props.data && this.props.data.getRibbon;
		if (ribbon) {
			return <div className="container">
				<h1>Ribbon</h1>
				<h2>{ribbon.title}</h2>
				<ul className="list-group">
					<li className="list-group-item">{ribbon.description}</li>
					<li className="list-group-item">Availability: {ribbon.Tags.map(tag => <span className="label label-default" key={tag.description}>{tag.description}</span>)}</li>
				</ul>
				<h4>Get it from:</h4>
				<ul className="list-group">
					<li className="list-group-item"><img src={ribbon.Owner.googlePicture} /></li>
					<li className="list-group-item">{ribbon.Owner.name}</li>
					{ribbon.Owner.sched ? <li className="list-group-item"><a href={ribbon.Owner.sched}>{ribbon.Owner.name}'s sched</a></li> : null}
				</ul>
			</div>
		} else {
			return <div className="container">
				<h1>Ribbon loading</h1>
			</div>;
		}
	}
}
