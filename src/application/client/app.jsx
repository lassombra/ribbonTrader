import React from 'react';
import Router from 'application/router';
import { ApolloProvider} from 'react-apollo';
import client from 'graphqlClient';

export default class App extends React.Component{
	constructor(props) {
		super(props);
		this.state = {component: this.props.component};
	}
	render() {
		return <ApolloProvider client={client}>
			{this.state.component || null}
		</ApolloProvider>;
	}
	componentDidMount() {
		window.addEventListener('click', event => {
			let target = event.target;
			while (target.nodeName !== 'A' && target.nodeName !== 'BODY') {
				target = target.parentNode;
			}
			if (target.nodeName == 'A') {
				let destination = target.attributes.getNamedItem('href');
				destination = destination && destination.value;
				if (destination && !destination.includes('://')) {
					event.preventDefault();
					event.stopPropagation();
					window.history.pushState({}, target.attributes.getNamedItem('title'), destination);
					this.setState(Router.run(window.location.pathname, {client}));
				}
			}
		});
		window.onpopstate = async () => {
			this.setState(await Router.run(window.location.pathname, {client}));
		}
	}
}