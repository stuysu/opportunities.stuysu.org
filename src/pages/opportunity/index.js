import React, {useContext} from "react";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";
import OpportunityOverview from "../../comps/opportunities/OpportunityOverview";
import {gql, useQuery} from "@apollo/client";
import {generatePath, useParams} from "react-router-dom";
import AuthenticationRequired from "../../comps/auth/AuthenticationRequired";
import UserContext from "../../comps/context/UserContext";
import slugify from "../../util/slugify";
import {client} from "../../comps/context/ApolloProvider";
import Error404 from "../404";
import Loading from "../../comps/ui/Loading";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const OppContext = React.createContext({});

const QUERY = gql`
	query Opportunity($id: Int!) {
		opportunityById(id: $id) {
			id
			title
			description
			categories {
				id
				name
				description
			}
			eligibilities {
				id
				name
				description
			}
			date
			location
			cost
			appDeadline
			link
		}
	}
`;

// Write a dynamic route for this page
const Opportunity = ({match, history}) => {
	const user = React.useContext(UserContext);
	let params = useParams();

	const url = parseInt(params.oppId);

	const {data, loading, error} = useQuery(QUERY, {
		variables: {signedIn: user.signedIn, id: url},
		client
	});

	if (!user.signedIn) return <AuthenticationRequired/>;
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const opp = data.opportunityById;

	return (
		<OppContext.Provider value={{...opp, error}}>
			<div>
				<Helmet>
					<title>{opp.title}</title>
				</Helmet>
				<main>
					<OpportunityOverview opp={opp}/>
				</main>
			</div>
		</OppContext.Provider>
	);
};

export default Opportunity;