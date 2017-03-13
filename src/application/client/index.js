import Home from 'home';
import ReactDom from 'react-dom';
import React from 'react';
import { ApolloProvider} from 'react-apollo';
import client from 'graphqlClient';


ReactDom.render(<ApolloProvider client={client}>
	<Home />
</ApolloProvider>, document.getElementById('appTarget'));