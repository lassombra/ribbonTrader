import React from 'react';
import loadGAuth from 'google/google-api';
import Handler from 'handler';

let GAuth = loadGAuth();


export default class Login extends React.Component {
	render() {
		if (!this.user || !this.user.isSignedIn()) {
			return <button onClick={this.login}>G+ Login</button>
		} else {
			return <button onClick={this.logout}><img src={this.user.getBasicProfile().getImageUrl()} />Logout</button>;
		}
	}
	async componentDidMount() {
		this.loadUser();
		let auth = (await GAuth)();
		auth.currentUser.listen(::this.loadUser);
	}
	async loadUser() {
		let auth = (await GAuth)();
		this.user = auth.currentUser.get();
		this.forceUpdate();
	}
	@Handler
	async login() {
		// this gets the auth object out of the mess that google made their api (having a self-referential then which
		// is therefore not chainable properly in a standard promise chain...)
		let auth = (await GAuth)();
		auth.signIn();
	}
	@Handler
	async logout() {
		let auth = (await GAuth)();
		auth.signOut();
	}
}