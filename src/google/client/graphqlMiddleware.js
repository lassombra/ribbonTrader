import loadGAuth from './google-api';
import client from 'graphqlClient';
export default async function applyMiddleware(req, next) {
	if (!req.options.headers) {
		req.options.headers = {};
	}
	let auth = (await loadGAuth())();
	const token = auth.currentUser.get().getAuthResponse().id_token;
	if (token) {
		req.options.headers.authorization = token || null;
	}
	next();
}
loadGAuth().then(func => func().currentUser.listen(() => client.resetStore()));