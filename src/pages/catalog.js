import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import OpportunityList from "../comps/opportunities/OpportunityList";
import { gql, useQuery } from "@apollo/client";
import { useLocation, useSearchParams } from "react-router-dom";
import AuthenticationRequired from "../comps/auth/AuthenticationRequired";
import UserContext from "../comps/context/UserContext";
import { CircularProgress } from "@mui/material";

const QUERY = gql`
  query Opportunities($categories: [Int], $eligibilities: [Int]) {
    opportunities(categories: $categories, eligibilities: $eligibilities) {
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

const Catalog = () => {
  const user = useContext(UserContext);

  // uses ? parameters as search params, targeting `q` as the search engine query key
  let [searchParams] = useSearchParams(); // TODO: filter data server-side in the GraphQL query

  let location = useLocation();
  let categories = location.state?.category ? [location.state?.category] : []; // TODO: add in-page user interface for categories
  let eligibilities = location.state?.eligibilities
    ? [location.state?.eligibilities]
    : [];

  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      categories,
      eligibilities,
    },
  });

  if (loading || user.loading) return <CircularProgress />;
  if (!user.signedIn) return <AuthenticationRequired />;
  if (error) return <p>Error :(</p>;

  let filtered = data["opportunities"];
  if (searchParams.get("q")) {
    filtered = data["opportunities"].filter((opportunity) => {
      for (const key of ["title", "description", "date", "location", "link"]) {
        if (opportunity[key]?.match(searchParams.get("q"))) {
          return opportunity;
        }
      }
      return null;
    });
  }

  return (
    <div>
      <Helmet>
        <title>Catalog</title>
      </Helmet>
      <Typography variant={"h1"}>Catalog</Typography>
      {searchParams && searchParams.get("q") ? (
        <Typography variant={"h2"}>
          Search Query: {searchParams.get("q")}
        </Typography>
      ) : null}
      <OpportunityList opportunities={{ opportunities: filtered }} />
    </div>
  );
};

export default Catalog;
