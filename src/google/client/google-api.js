/** @module google-client-api */

import scriptjs from 'scriptjs';

/**
 * This module is a function which will return a Google Client API object
 * (https://developers.google.com/api-client-library/javascript/dev/dev_jscript) assynchronously.
 *
 * This function returns a promise. (if you're into promises) Which will return the gapi Object.
 *
 * If you're not into promises then you can simply call this function and pass in a callback object.
 *
 * @param  {Function} onComplete an optional callback which will return the Google Client API Object.
 * @return {Promise} This function also returns a promise if you're into promises which will
 *                   return the Google Client API Object.
 *
 * @example Using with Promise
 * require( 'google-client-api' )().then( function( gapi ) {
 * 	// Do something with the gapi object
 * });
 *
 * @example Using with callback
 * require( 'google-client-api' )( function( gapi ) {
 * 	// Do something with the gapi object
 * });
 */
function loadGoogleAPI() {

	return new Promise( function( resolve ) {

		if( window.gapi ) {
			resolve(window.gapi);
		} else {

			window.$loadGoogleClient$onClientLoad = function() {
				window.gapi.load('auth2', () => {
					resolve(window.gapi);
				});
			};

			scriptjs( 'https://apis.google.com/js/platform.js?onload=$loadGoogleClient$onClientLoad' );
		}
	});
};

var GAuth;
export default function loadGAuth() {
	if (!GAuth) {
		GAuth = loadGoogleAPI().then(gapi => {
			return new Promise((resolve, reject) => {
				let auth = gapi.auth2.init({
					client_id: '516740890096-l3u1tn137srkmqec8aljh0cdj3u7h3ip.apps.googleusercontent.com'
				});
				// auth has a then on it, but if it ends up calling it's own then, it'll chain infinitely...  Thanks Google
				// anyways, it is therefore important to do this dereferencing.
				auth.then(() => resolve(() => auth), reject);
			});
		});
	}
	return GAuth;
}