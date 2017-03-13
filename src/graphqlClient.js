import ApolloClient, { createNetworkInterface, toIdValue} from 'apollo-client';
import applyMiddleware from 'google/graphqlMiddleware';

const dataIdFromObject = result => {
	if (result.id && result.__typename) {
		return result.__typename + result.id;
	}
};

const networkInterface = createNetworkInterface({ uri: `${window.location.protocol}//${window.location.host}/graphql` });
networkInterface.use([{
	applyMiddleware
}]);

export default new ApolloClient({
	networkInterface,
	initialState: window.__APOLLO_STATE__,
	dataIdFromObject
});