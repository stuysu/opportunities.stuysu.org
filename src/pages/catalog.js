import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import OpportunityList from "../comps/opportunities/OpportunityList";
import { gql, useQuery } from "@apollo/client";
import { useSearchParams, useLocation } from "react-router-dom";
import AuthenticationRequired from "../comps/auth/AuthenticationRequired";
import UserContext from "../comps/context/UserContext";

import {
  CircularProgress,
  FormGroup,
  Grid,
  Input,
  Chip,
  Toolbar,
  Button,
  Box,
} from "@mui/material";

const ELIGIBILITY_QUERY = gql`
  query Eligibilities {
    eligibilities {
      name
    }
  }
`;

const CATEGORY_QUERY = gql`
  query Categories {
    categories {
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
  const [windowDimension, setWindowDimension] = useState(null);
  // only for mobile
  const [filterEnabled, setFilterEnabled] = useState(false);

  let location = useLocation();

  const user = useContext(UserContext);
  const [maxCost, setMaxCost] = useState(10000);

  // uses ? parameters as search params, targeting `q` as the search engine query key
  let [searchParams] = useSearchParams(); // TODO: filter data server-side in the GraphQL query

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
    setEligibilitiesWrapper(newEligibilities);
    //console.log(newEligibilities);
  };

  const toggleCategory = (category) => {
    const newCategories = [...categories];
    const categoryIndex = categories.indexOf(category);
    if (categoryIndex === -1) {
      newCategories.push(category);
    } else {
      newCategories.splice(categoryIndex, 1);
    }
    setCategoriesWrapper(newCategories);
    //console.log(newCategories);
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
  const categories_response = useQuery(CATEGORY_QUERY);

  const allEligibilities = eligibilities_response?.data?.eligibilities?.map(
    (a) => a.name
  );

  const allCategories = categories_response?.data?.categories?.map(
    (a) => a.name
  );

  /*
   * cursed way of distinguishing group and grade eligibilities - grades are 1 word, groups are multi-word, so we scan for a space
   * because graphQL/sequelize will only return the eligibilities we queried for, we can ignore all other eligibilities
   */

  const allGrades = allEligibilities?.filter(
    (eligibility) => !eligibility.match(" ")
  );

  const allGroups = allEligibilities?.filter((eligibility) =>
    eligibility.match(" ")
  );

  const initialCategories = location.state?.category
    ? [location.state?.category]
    : [];
  const initialEligibilities = allGrades;

  const getCachedCategories = () => {
	  try {
		  return JSON.parse(window.sessionStorage.getItem("categories"));
	  } catch (e){
		  return allCategories;
	  }
  }

  const getCachedEligibilities = () => {
	  try {
		  return JSON.parse(window.sessionStorage.getItem("eligibilities"));
	  } catch (e){
		  return allGrades;
	  }
  }

  const [categories, setCategories] = React.useState(searchParams.get("q") ? allCategories : (!initialCategories.length ? initialCategories :
    window.sessionStorage.getItem("categories") !== undefined && window.sessionStorage.getItem("categories") !== null
      ? getCachedCategories()
      : initialCategories
	 )
  );

  //console.log("Categories:");
  //console.log(categories);
  //console.log("Initial cateogires:");
  //console.log(initialCategories);

  const setCategoriesWrapper = (categories) => {
    window.sessionStorage.setItem("categories", JSON.stringify(categories));
    setCategories(categories);
  };

  const [eligibilities, setEligibilities] = React.useState(searchParams.get("q") ? allGrades : (
    window.sessionStorage.getItem("eligibilities") !== undefined && window.sessionStorage.getItem("eligibilities") !== null
      ? getCachedEligibilities()
      : initialEligibilities
	)
  );

  //console.log("Categories:");
  //console.log(categories);
  //console.log("Eligibilities:");
  //console.log(eligibilities);
  //console.log("Init eligibilities:");
  //console.log(initialEligibilities);
  //console.log("All grades:");
  //console.log(allGrades);
  //console.log("All eligibilities:");
  //console.log(allEligibilities);

  const selectedGrades = eligibilities?.filter(
    (eligibility) => !eligibility.match(" ")
  );

  const selectedGroups = eligibilities?.filter((eligibility) =>
    eligibility.match(" ")
  );

  const setEligibilitiesWrapper = (eligibilities) => {
    window.sessionStorage.setItem(
      "eligibilities",
      JSON.stringify(eligibilities)
    );
    setEligibilities(eligibilities);
  };

  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      cost: maxCost,
      categories: categories?.map((e) => allCategories?.indexOf(e) + 1),
      eligibilities: allEligibilities?.map(
        (e) => allEligibilities?.indexOf(e) + 1
      ),
    },
    skip: eligibilities_response.loading || !allEligibilities,
  });

  useEffect(() => {
    if (eligibilities === undefined || eligibilities === null) {
      setEligibilitiesWrapper(allGrades);
    } else {
	  window.sessionStorage.setItem("eligibilities", JSON.stringify(eligibilities));
	}
  }, [eligibilities, allGrades]);
  useEffect(() => {
    if (categories === undefined || !categories.length || categories === null) {
      setCategoriesWrapper(allCategories);
    } else {
	  window.sessionStorage.setItem("categories", JSON.stringify(categories));
	}
  }, [categories, allCategories]);
  /* MOBILE */
  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  if (loading || user.loading || eligibilities_response.loading)
    return <CircularProgress />;
  if (!user.signedIn) return <AuthenticationRequired />;
  if (error) return <p>Error :(</p>;

  // Filter by search parameter
  let filtered = data["opportunities"];
  //console.log("INITIAL", filtered);
  if (searchParams.get("q")) {
    filtered = filtered.filter((opportunity) => {
      for (const key of ["title", "description", "date", "location", "link"]) {
        if (opportunity[key]?.match(searchParams.get("q"))) {
          return opportunity;
        }
      }
      return null;
    });
  }

  // Filter by eligibility - grades required
  filtered = filtered.map((opportunity) => {
    return {
      ...opportunity,
      groupEligibilities: opportunity.eligibilities.filter((eligibility) =>
        selectedGroups.includes(eligibility.name)
      ),
      allGroupEligibilities: opportunity.eligibilities.filter((eligibility) =>
        allGroups.includes(eligibility.name)
      ),
      gradeEligibilities:
        opportunity.eligibilities.filter((eligibility) =>
          selectedGrades.includes(eligibility.name)
        ) || selectedGrades, // for empty grade lists, imply all grades we want are valid
    };
  });
  //console.log(filtered)
  filtered = filtered.filter((opportunity) => {
    // If no grade or group is selected, then we include all opportunities regardless or grade / group
    // Otherwise, restrict to only opportunities with user-selected grade / group
    return (
      (!selectedGrades.length || opportunity.gradeEligibilities.length) &&
      (!selectedGroups.length || opportunity.groupEligibilities.length)
    );
  });
  //console.log(filtered);

  let isMobile = () => {
    if (!windowDimension) {
      setWindowDimension(window.innerWidth);
    }
    return windowDimension < 900;
  };

  const resetFiltersToDefault = () => {
	  setEligibilitiesWrapper(allGrades);
	  setCategoriesWrapper(allCategories);
  };

  let renderFilters = () => {
    const renderFilter = () => {
      return (
        <React.Fragment>
          <Typography variant={"h4"}>Filters</Typography>
		  <Chip label="Reset All Filters to Default" onClick={() => resetFiltersToDefault()} color="primary" sx={{width: "fit-content", margin: "0.2rem 0.2rem 0.5rem"}}/>
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <b className={"block w-full mb-2"}>Categories</b>
            {allCategories.map((category) => (
              /*
											<FormControlLabel
												checked={eligibilities.indexOf(eligibility) > -1}
												control={
													<Checkbox onChange={() => toggleEligibility(eligibility)} />
												}
												label={eligibility}
											/>
								*/
              // Render a chip instead of a checkbox, the chip can be toggled on/off
              <Chip
                variant="outlined"
                label={category}
                onClick={() => toggleCategory(category)}
                color={
                  categories.indexOf(category) > -1 ? "primary" : "default"
                }
                sx={{ width: "fit-content", margin: "0.2rem" }}
              />
            ))}
            <b className={"block w-full mb-2"}>Eligibilities</b>
            {allEligibilities.map((eligibility) => (
              /*
											<FormControlLabel
												checked={eligibilities.indexOf(eligibility) > -1}
												control={
													<Checkbox onChange={() => toggleEligibility(eligibility)} />
												}
												label={eligibility}
											/>
								*/
              // Render a chip instead of a checkbox, the chip can be toggled on/off
              <Chip
                variant="outlined"
                label={eligibility}
                onClick={() => toggleEligibility(eligibility)}
                color={
                  eligibilities.indexOf(eligibility) > -1
                    ? "primary"
                    : "default"
                }
                sx={{ width: "fit-content", margin: "0.2rem" }}
              />
            ))}
          </FormGroup>
          <Typography
            variant="body2"
            sx={{ fontSize: "8px", paddingTop: "5px", paddingBottom: "5px" }}
          >
            Note: If you do not add a filter criteria for grades, or group-based
            eligibilities respectively, it will give you all opportunities that
            match your other criteria. <br />
            In addition, if you filter for group-based eligibilities (eg. female
            / non-binary), it will only show opportunities that select
            specifically for people with those eligibilities (eg. being female
            or non-binary). Therefore, if you want to see all opportunities you
            are eligible to apply to, you need to run a second search without
            the criteria, which will show opportunities that everyone can apply
            to.
          </Typography>
          <Box sx={{ paddingTop: "6px", width: "100%", flexBasis: "100%" }}>
            <b className={"block w-full mb-2"}>Other</b>
          </Box>
          <Typography id="cost-slider">Max Cost</Typography>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
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
        </React.Fragment>
      );
    };

    const renderFilterDrop = () => {
      return (
        <Toolbar>
          <Button
            variant={"outlined"}
            color={"primary"}
            sx={{ my: 1 }}
            onClick={() => {
              setFilterEnabled(!filterEnabled);
            }}
          >
            FILTERS
          </Button>
        </Toolbar>
      );
    };

    return (
      <Grid
        xs={12}
        sm={12}
        md={4}
        lg={3}
        xl={3}
        // contains all the filters, make sure this stays visible on scroll
        sx={{
          position: "sticky",
          top: 0,
          height: "auto",
          overflowY: "auto",
          zIndex: 100,
        }}
      >
        {/* make sure to use theme for this? */}
        <Box sx={{ padding: "20px" }} bgcolor="background.default">
          {isMobile() && renderFilterDrop()}

          {((isMobile() && filterEnabled) || !isMobile()) && renderFilter()}
        </Box>
      </Grid>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Catalog</title>
      </Helmet>
      <Grid container spacing={2} className="relative">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="sticky">
          <Typography variant={"h1"}>Catalog</Typography>
        </Grid>
        {renderFilters()}
        <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
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
