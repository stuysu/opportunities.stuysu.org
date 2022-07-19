import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import UserContext from "./UserContext";

const userQuery = gql`
	query {
		authenticatedUser{
			id
			firstName
			lastName
			email
			gradYear
			isFaculty
		}
	}
`;

const logoutMutation = gql`
	mutation {
		logout
	}
`;

const UserProvider = (props) => {
	const {data, refetch} = useQuery(userQuery);
	const [logoutCookie] = useMutation(logoutMutation);
	const logout = async () => {
		await logoutCookie();
		window.localStorage.clear();
		window.location.reload();
	}
	
	const value = (data?.authenticatedUser ? {
		signedIn: true,
		refetch,
		logout,
		...data.authenticatedUser
	} : {signedIn: false, refetch});
	
	return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export default UserProvider;