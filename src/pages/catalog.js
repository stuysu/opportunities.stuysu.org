import React, { useContext, useEffect, useState } from "react";
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
  Input,
} from "@mui/material";

const ELIGIBILITY_QUERY = gql`
  query Eligibilities {
    eligibilities {
      name
    }
  }
`;

const QUERY = gql`
  query Opportunities($cost: Int, $categories: [Int], $eligibilities: [Int]) {
    opportunities(
      cost: $cost
      categories: $categories
      eligibilities: $eligibilities
    ) {
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
  const [maxCost, setMaxCost] = useState(10000);

  // uses ? parameters as search params, targeting `q` as the search engine query key
  let [searchParams] = useSearchParams(); // TODO: filter data server-side in the GraphQL query

  let location = useLocation();
  let categories = location.state?.category ? [location.state?.category] : []; // TODO: add in-page user interface for categories

  /**
   * Toggles eligibility
   * @param {string} eligibility - the name of the eligibility item to be toggled on/off
   */
  const toggleEligibility = (eligibility) => {
    const newEligibilities = [...eligibilities];
    const eligibilityIndex = eligibilities.indexOf(eligibility);
    if (eligibilityIndex === -1) {
      newEligibilities.push(eligibility);
    } else {
      newEligibilities.splice(eligibilityIndex, 1);
    }
    setEligibilities(newEligibilities);
    console.log(newEligibilities);
  };

  // TODO: Fix Slider and re-rendering issues
  // const handleSliderChange = (event, newCost) => {
  //   setMaxCost(newCost);
  //
  // }
  //
  // const handleSliderChangeCommitted = (event, newCost) => {
  // };

  const handleInputChange = (event) => {
    setMaxCost(event.target.value === "" ? 0 : Number(event.target.value));
  };

  // Get array of eligibility names
  const eligibilities_response = useQuery(ELIGIBILITY_QUERY);
  const allEligibilities = eligibilities_response?.data?.eligibilities?.map(
    (a) => a.name
  );
  const [eligibilities, setEligibilities] = React.useState();
  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      cost: maxCost,
      categories: categories,
      eligibilities: eligibilities?.map(
        (e) => allEligibilities?.indexOf(e) + 1
      ),
    },
    skip: eligibilities_response.loading || !allEligibilities,
  });
  useEffect(() => {
    if (eligibilities === undefined) {
      setEligibilities(allEligibilities);
    }
  }, [eligibilities, allEligibilities]);
  if (loading || user.loading || eligibilities_response.loading)
    return <CircularProgress />;
  if (!user.signedIn) return <AuthenticationRequired />;
  if (error) return <p>Error :(</p>;

  // Filter by search parameter
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
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Typography variant={"h1"}>Catalog</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
          <FormGroup>
            {allEligibilities.map((eligibility) => (
              <FormControlLabel
                checked={eligibilities.indexOf(eligibility) > -1}
                control={
                  <Checkbox onChange={() => toggleEligibility(eligibility)} />
                }
                label={eligibility}
              />
            ))}
          </FormGroup>
          <Typography id="cost-slider">Max Cost</Typography>
          <Grid container spacing={2} alignItems="center">
            {/*<Grid item xs={12} sm={8} md={8} lg={8} xl={8}>*/}
            {/*  <Slider*/}
            {/*    value={maxCost}*/}
            {/*    min={0}*/}
            {/*    max={10000}*/}
            {/*    step={1000}*/}
            {/*    valueLabelDisplay="auto"*/}
            {/*    onChange={handleSliderChange}*/}
            {/*    onChangeCommitted={handleSliderChangeCommitted}*/}
            {/*  />*/}
            {/*</Grid>*/}
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
              <Input
                autoFocus
                value={maxCost}
                size="small"
                onChange={handleInputChange}
              />
            </Grid>
            {/*<Button*/}
            {/*  variant="contained"*/}
            {/*  onClick={() => {*/}
            {/*    query();*/}
            {/*  }}*/}
            {/*>*/}
            {/*  Submit*/}
            {/*</Button>*/}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
          {searchParams && searchParams.get("q") ? (
            <Typography variant={"h2"}>
              Search Query: {searchParams.get("q")}
            </Typography>
          ) : null}
          <OpportunityList opportunities={{ opportunities: filtered }} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Catalog;
