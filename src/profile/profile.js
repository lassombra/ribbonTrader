import React from 'react';
import query from './profile.graphql';
import update from './updateProfile.graphql';
import {graphql} from 'react-apollo';
import Handler from 'handler';

@graphql(query)
@graphql(update)
export default class Profile extends React.Component {
	render() {
		let user = this.props.data && this.props.data.getCurrentUser;
		if (user) {
			return <div className="container">
				<h1>User Profile</h1>
				<h2>{user.name}</h2>
				<img src={user.googlePicture} />
				<form onSubmit={this.submitForm} className="form form-horizontal">
					<div className="form-group col-xs-12">
						<label>Display Name:</label>
						<input className="form-control" defaultValue={user.displayedName || ''} />
					</div>
					<div className="form-group col-xs-12">
						<label>Sched Link:</label>
						<input className="form-control" defaultValue={user.sched || ''} />
					</div>
					<button className="btn btn-default" type="submit">Save changes</button>
				</form>
				<table className="table table-striped">
					<caption>Your current ribbons</caption>
					<thead>
						<tr>
							<th>Title</th>
							<th>Description</th>
							<th>Availability</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
					{user.ribbons.length > 0 ?
						user.ribbons.map(ribbon => <tr key={ribbon.id}>
							<td>{ribbon.title}</td>
							<td>{ribbon.description}</td>
							<td>{ribbon.Tags.map(tag => tag.description).join(', ')}</td>
							<td>
								<button className="btn btn-danger">
									<i className="glyphicon glyphicon-remove" />
								</button>
								<button className="btn btn-default">
									<i className="glyphicon glyphicon-edit" />
								</button>
							</td>
						</tr>)
						: <tr><td colSpan="4">You don't have any ribbons displayed yet</td></tr>}
					</tbody>
				</table>
			</ div>;
		} else {
			return <div>
				<h1>No currently logged in user.</h1>
			</div>
		}
	}
	@Handler
	submitForm(event) {
		event.preventDefault();
		let inputs = document.getElementsByTagName('input');
		let displayedName = inputs[0].value || null;
		let sched = inputs[1].value || null;
		if (this.props.mutate) {
			this.props.mutate({variables: {currentUser: {
				displayedName,
				sched
			}}})
				.then(() => {this.props.data.refetch()});
		}
	}
}