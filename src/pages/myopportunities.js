import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import UserContext from "../comps/context/UserContext";
import { CircularProgress } from "@mui/material";
import { gql, useQuery } from "@apollo/client";
import AuthenticationRequired from "../comps/auth/AuthenticationRequired";
import OpportunityList from "../comps/opportunities/OpportunityList";

const QUERY = gql`
  query Opportunities($user: Int) {
    opportunities(user: $user) {
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

const MyOpportunities = () => {
  const user = useContext(UserContext);
  const userId = user.id;

  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      user: userId,
    },
  });

  if (loading || user.loading) return <CircularProgress />;
  if (!user.signedIn) return <AuthenticationRequired />;
  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }
  let filtered = data["opportunities"];

  return (
    <div>
      <Helmet>
        <title>My Opportunities</title>
      </Helmet>
      <Typography variant={"h1"}>My opportunities</Typography>
      <OpportunityList opportunities={{ opportunities: filtered }} />
    </div>
  );
};

export default MyOpportunities;
