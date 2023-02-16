import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import OpportunityList from "../comps/opportunities/OpportunityList";
import { gql, useQuery } from "@apollo/client";
import { useLocation, useSearchParams } from "react-router-dom";
import AuthenticationRequired from "../comps/auth/AuthenticationRequired";
import UserContext from "../comps/context/UserContext";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";

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
  let eligibilities = [ // TODO: Query instead of declaring as constant
    "Freshman",
    "Sophomore",
    "Junior",
    "Senior",
    "Female Only",
    "Underrepresented Community",
  ];

  const [allEligibility, setAllEligibility] = React.useState([]); // TODO: Change variable naming

  const toggleEligibility = (eligibility) => {
    const eligibilityIndex = allEligibility.indexOf(eligibility);
    if (eligibilityIndex === -1) {
      allEligibility.push(eligibility);
    } else {
      allEligibility.splice(eligibilityIndex, 1);
    }
    setAllEligibility(allEligibility);
    console.log(allEligibility);
  }

  // const { data, loading, error } = useQuery(QUERY, {
  //   variables: {
  //     categories,
  //     eligibilities,
  //   },
  // });

  // if (loading || user.loading) return <CircularProgress />;
  // if (!user.signedIn) return <AuthenticationRequired />;
  // if (error) return <p>Error :(</p>;
  //
  // let filtered = data["opportunities"];
  // if (searchParams.get("q")) {
  //   filtered = data["opportunities"].filter((opportunity) => {
  //     for (const key of ["title", "description", "date", "location", "link"]) {
  //       if (opportunity[key]?.match(searchParams.get("q"))) {
  //         return opportunity;
  //       }
  //     }
  //     return null;
  //   });
  // }

  return (
    <div>
      <Helmet>
        <title>Catalog</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant={"h1"}>Catalog</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
          <FormGroup>
            {eligibilities.map((eligibility) => (
              <FormControlLabel
                control={<Checkbox
                  onChange={() => toggleEligibility(eligibility)}
                />}
                label={eligibility}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
          {searchParams && searchParams.get("q") ? (
            <Typography variant={"h2"}>
              Search Query: {searchParams.get("q")}
            </Typography>
          ) : null}
          {/*<OpportunityList opportunities={{ opportunities: filtered }} />*/}
        </Grid>
      </Grid>
    </div>
  );
};

export default Catalog;
