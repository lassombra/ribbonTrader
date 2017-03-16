import React from 'react';
import editLoad from './editLoad.graphql';
import editSubmit from './editSubmit.graphql';
import {graphql} from 'react-apollo'
import Select from 'react-select';
import Handler from 'handler';
import Router from 'application/router';

@graphql(editLoad, {options: ({id}) => ({
	variables: {
		ribbon: id || 0,
		hasId: !!id
	}
})})
@graphql(editSubmit)
export default class Edit extends React.Component {
	render() {
		return <div className="container">
			<h1>{this.props.id ? 'Editing' : 'New'} ribbon</h1>
			{this.form}
		</div>
	}
	get form() {
		let ribbon = this.props.data && this.props.data.getRibbon;
		let id = this.props.id;
		let user = this.props.data && this.props.data.getCurrentUser;
		let tags = this.props.data && this.props.data.getTags;
		if (!user) {
			return <div className="alert alert-danger">Please login first.</div>
		}
		if (id && !ribbon.Owner.id == user.id) {
			return <div className="alert alert-danger">You are not authorized to edit this ribbon.</div>
		}
		else {
			return <form onSubmit={this.submit} className="form form-horizontal">
				<div className="form-group col-xs-12">
					<label>Title:</label>
					<input className="form-control" defaultValue={ribbon && ribbon.title || ''} />
				</div>
				<div className="form-group col-xs-12">
					<label>Description: <small>how to get the ribbon</small></label>
					<input className="form-control" defaultValue={ribbon && ribbon.description || ''} />
				</div>
				<div className="form-group col-xs-12">
					<label>Availability Tags: <small>general category for this ribbon</small></label>
					<Select multi={true}
					        options={tags.map(tag => ({value: tag, label: tag.description}))}
					        value={this.state && this.state.tags || ribbon && ribbon.Tags}
					        onChange={val => this.setState({tags:val})}
					/>
				</div>
				<button type="submit" className="btn btn-default">Save Changes</button>
			</form>;
		}
	}
	@Handler
	submit(event) {
		event.preventDefault();
		let inputs = document.getElementsByTagName('input');
		let title = inputs[0].value;
		let description = inputs[1].value;
		let tags = this.state.tags || ribbon && ribbon.Tags;
		if (tags.length > 0 && tags[0].value) {
			tags = tags.map(tag => tag.value);
		}
		tags = tags.map(tag => ({id: tag.id}));
		let ribbon = {
			title,
			description,
			Tags: tags,
			id: this.props.id || undefined
		};
		this.props.mutate({variables: {ribbon}})
			.then(({id}) => {
				Router.go('displayRibbon', {id});
			});
	}
}