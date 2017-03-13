import ApolloClient, { createNetworkInterface, toIdValue} from 'apollo-client';

const dataIdFromObject = result => {
	if (result.id && result.__typename) {
		return result.__typename + result.id;
	}
};

export default new ApolloClient({
	networkInterface: createNetworkInterface({ uri: `${window.location.protocol}//${window.location.host}/graphql` }),
	initialState: window.__APOLLO_STATE__,
	dataIdFromObject
});