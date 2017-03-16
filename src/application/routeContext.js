import React from 'react'
export default class RouterContext extends React.Component {
	render () {
		return this.props.children;
	}
	getChildContext() {
		return {routeContext: this.props.context};
	}
	static childContextTypes = {
		routeContext: React.PropTypes.object
	}
}