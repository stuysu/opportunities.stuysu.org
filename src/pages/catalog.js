import React, {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";
import OpportunityList from "../comps/opportunities/OpportunityList";
import {gql, useQuery} from "@apollo/client";
import { useSearchParams} from "react-router-dom";
import AuthenticationRequired from "../comps/auth/AuthenticationRequired";
import UserContext from "../comps/context/UserContext";

import {
	CircularProgress,
	FormGroup,
	Grid,
	Input,
	Chip,
	AppBar,
	Toolbar,
	Button
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
		setEligibilities(newEligibilities);
		console.log(newEligibilities);
	};

	const toggleCategory = (category) => {
		const newCategories = [...categories];
		const categoryIndex = categories.indexOf(category);
		if (categoryIndex === -1) {
			newCategories.push(category);
		} else {
			newCategories.splice(categoryIndex, 1);
		}
		setCategories(newCategories);
		console.log(newCategories);
	}

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
	const [eligibilities, setEligibilities] = React.useState();
	const [categories, setCategories] = React.useState();

	const {data, loading, error} = useQuery(QUERY, {
		variables: {
			cost: maxCost,
			categories: categories?.map(
				(e) => allCategories?.indexOf(e) + 1
			),
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
	useEffect(() => {
		if (categories === undefined) {
			setCategories(allCategories);
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
		return <CircularProgress/>;
	if (!user.signedIn) return <AuthenticationRequired/>;
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

	let isMobile = () => {
		return windowDimension < 900;
	}

	let renderFilters = () => {
		const renderFilter = () => {
			return (
				<React.Fragment>
				<Typography variant={"h4"}>Filters</Typography>
				<FormGroup
							sx={{display: "flex", flexDirection: "row", alignItems: "flex-start" }}
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
									color={categories.indexOf(category) > -1 ? "primary" : "default"}
									sx={{width: "fit-content", margin: "0.2rem"}}
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
									color={eligibilities.indexOf(eligibility) > -1 ? "primary" : "default"}
									sx={{width: "fit-content", margin: "0.2rem"}}
								/>
							))}
						</FormGroup>
						<b className={"block w-full mb-2"}>Other</b>
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
				</React.Fragment>
			);
		}

		const renderFilterDrop = () => {
			return (
			<AppBar position="static">
  				<Toolbar variant="dense">
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
			</AppBar>
			);
		}	

		return (
			<Grid item xs={12} sm={12} md={4} lg={3} xl={3}
						// contains all the filters, make sure this stays visible on scroll
								sx={{position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}
					>
				{isMobile() && renderFilterDrop()}
				{((isMobile() && filterEnabled) || !isMobile()) && renderFilter()}
			</Grid>
		);		
	}

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
					<OpportunityList opportunities={{opportunities: filtered}}/>
				</Grid>
			</Grid>
		</div>
	);
};

export default Catalog;
