import pathToRegexp from 'path-to-regexp';
import qs from 'qs';
import React from 'react';
import redirectServer from './server/redirect'
import redirectClient from './client/redirect';
import RouteContext from './routeContext';
export RequestAware from './requestAware';
class Router {
	constructor(routes = []) {
		this.routes = routes;
	}
	route(path, handler, name) {
		let route = new Route(Router._processPath(path), handler, name);
		this.routes.unshift(route);
	}
	setLayout(layout) {
		this.layout = layout;
	}
	// intended for quick use during a single event loop iteration.
	// setting context provides a single request in which to handle
	// server side redirects or status changes
	setContext(context) {
		if (SERVER) {
			this.context = context;
		}
	}
	clearContext() {
		this.context = undefined;
	}
	run(url) {
		if (CLIENT) {
			this.url = url;
		}
		let path = url.split('?');
		let query = path.length > 1 ? path[1] : '';
		path = Router._processPath(path[0]);
		for (let route of this.routes) {
			if (route.test(path)) {
				let result = route.run(path, qs.parse(query, {depth: 3}));
				if (result.component && this.layout) {
					result.component = <this.layout>{result.component}</this.layout>;
				}
				if (result.component) {
					result.component = <RouteContext context={result}>{result.component}</RouteContext>;
				}
				return result;
			}
		}
		return false;
	}
	rerun() {
		if (CLIENT && this.url) {
			this.run(this.url);
		}
	}
	go(pathOrName, params = undefined, query = false) {
		let path = false;
		if (!pathOrName.includes('/')) {
			// path is a name
			let route = this.routes.filter(route => route.name == pathOrName)[0];
			if (route) {
				path = route.go(params, query);
			}
		} else {
			path = pathOrName;
		}
		if (path) {
			if (redirectServer) {
				return redirectServer(path, this.context);
			} else {
				return redirectClient(path);
			}
		}
	}
	status(statusCode) {
		if (SERVER) {
			if (this.context) {
				this.context.status = statusCode;
			}
		}
	}
	static _processPath(path) {
		let processedPath = path.replace(/^\/?(.*?)\/?$/, '$1');
		processedPath = '/' + processedPath;
		if (processedPath.slice(-1) != '/') {
			processedPath += '/';
		}
		return processedPath;
	}
	setHandler(path, handler, name) {
		let routes = this.routes.filter(route => route.path == path && route.name == name);
		if (routes.length > 0) {
			routes.forEach(route => route.handler = handler);
		} else {
			this.route(path, handler, name);
		}
		this.rerun();
	}
}
class Route {
	constructor(path, handler, name) {
		this.path = path;
		this.handler = handler;
		this.name = name;
		let keys = [];
		let regex = pathToRegexp(path,  keys);
		this.routeProcessor = {regex, keys};
		this.toPath = pathToRegexp.compile(path);
	}
	test(url) {
		return this.routeProcessor.regex.exec(url);
	}
	go(params, query) {
		let processedQuery = query ? `?${qs.stringify(query, {encode: false})}` : '';
		return `${this.toPath(params)}${processedQuery}`;
	}
	run(url, query) {
		let params = {};
		let result = this.routeProcessor.regex.exec(url);
		for (let i = 0; i < this.routeProcessor.keys.length; i++) {
			let key = this.routeProcessor.keys[i];
			params[key.name] = result[i+1];
		}
		params.query = query;
		let handled = this.handler(params);
		if (!('component' in handled)) {
			return {status: 200, component: handled};
		} else {
			return handled;
		}
	}
}
let router;
if (module.hot && module.hot.data) {
	let routes = module.hot.data.routes.map(route => new Route(route.path, route.handler, route.name));
	router = new Router(routes);
}
else {
	router = new Router();
}
export default router;
if (module.hot) {
	module.hot.dispose(data => {data.routes = router.routes;})
}