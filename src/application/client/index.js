import Router from '../router';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './app.jsx';

window.setTimeout(
	async function() {
		let result = await Router.run(window.location.pathname);
		ReactDOM.render(<App {...result} />, document.getElementById('appTarget'))
	}, 0
);