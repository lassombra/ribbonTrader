import GoogleAuth from 'google-auth-library';
const auth = new GoogleAuth();
const CLIENT_ID = '516740890096-l3u1tn137srkmqec8aljh0cdj3u7h3ip.apps.googleusercontent.com';
const client = new auth.OAuth2(CLIENT_ID, '', '');

export default function getUserId(token) {
	return new Promise((resolve, reject) => {
		client.verifyIdToken(
			token,
			CLIENT_ID,
			function(e, login) {
				if (e) {
					reject(e);
				} else {
					let payload = login.getPayload();
					let {sub, name, picture} = payload;
					resolve({id: sub, name, image: picture});
				}
			}
		)
	});
}