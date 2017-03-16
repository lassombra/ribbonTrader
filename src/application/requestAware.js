import React from 'react';
import Router from './router';
export default function(requestAwareFn) {
	return function(target) {
		function wrapper(props, context) {
			Router.setContext(context.routeContext);
			requestAwareFn(props);
			Router.clearContext();
			return React.createElement(target, props);
		}
		wrapper.contextTypes = {routeContext: React.PropTypes.object};
		wrapper.displayName = `RequestAware(${target.displayName || target.name})`;
		return wrapper;
	}
}