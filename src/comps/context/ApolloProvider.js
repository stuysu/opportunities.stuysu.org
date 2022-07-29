import React from "react";
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider as Provider} from "@apollo/client";

import {GRAPHQL_URI} from "../../constants";

const authJWT = window.localStorage.getItem("auth-jwt");

const link = new HttpLink({
	uri: GRAPHQL_URI,
	credentials: "include",
	headers: {Authorization: authJWT ? ("Bearer " + authJWT) : ""}
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
})

const ApolloProvider = props => {
	return <Provider client={client}>{props.children}</Provider>;
};

export default ApolloProvider