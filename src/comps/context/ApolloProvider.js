import React from "react";
import {ApolloClient, InMemoryCache, ApolloProvider as Provider} from "@apollo/client";

import {GRAPHQL_URI} from "../../constants";

const client = new ApolloClient({
	uri: GRAPHQL_URI,
	cache: new InMemoryCache()
})

const ApolloProvider = props => {
	return <Provider client={client}>{props.children}</Provider>;
};

export default ApolloProvider