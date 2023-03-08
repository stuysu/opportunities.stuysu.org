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
	Chip
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

	/*
	 * cursed way of distinguishing group and grade eligibilities - grades are 1 word, groups are multi-word, so we scan for a space
	 * because graphQL/sequelize will only return the eligibilities we queried for, we can ignore all other eligibilities
	*/
	const selectedGrades = eligibilities?.filter(eligibility => !eligibility.match(" "));
	const selectedGroups = eligibilities?.filter(eligibility => eligibility.match(" "));

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
			// default to empty, unfiltered eligibilities selection (shows everything)
			setEligibilities([]);
		}
	}, [eligibilities, allEligibilities]);
	useEffect(() => {
		if (categories === undefined) {
			setCategories(allCategories);
		}
	}, [categories, allCategories]);

	if (loading || user.loading || eligibilities_response.loading)
		return <CircularProgress/>;
	if (!user.signedIn) return <AuthenticationRequired/>;
	if (error) return <p>Error :(</p>;

	let filtered = data["opportunities"];
	console.log("INITIAL", filtered);
	// Filter by search parameter
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
			groupEligibilities: opportunity.eligibilities.filter(
				eligibility => selectedGroups.includes(eligibility.name)
			),
			gradeEligibilities: opportunity.eligibilities.filter(
				eligibility => selectedGrades.includes(eligibility.name)
			) || selectedGrades,  // for empty grade lists, imply all grades we want are valid
		}
	})
	filtered = filtered.filter((opportunity) => {
		// so long as we have an eligibility for each category we have selections in, we're golden
		// we dont care to restrict if we dont have an explicit grade selection - this way people can discover more
		return (!selectedGrades.length || opportunity.gradeEligibilities.length) &&
			(!selectedGroups.length || opportunity.groupEligibilities.length)
	});
	console.log(filtered);

	return (
		<div>
			<Helmet>
				<title>Catalog</title>
			</Helmet>
			<Grid container spacing={2} className="relative">
				<Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="sticky">
					<Typography variant={"h1"}>Catalog</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={4} lg={3} xl={3}
					// contains all the filters, make sure this stays visible on scroll
							sx={{position: "sticky", top: 0, height: "100vh", overflowY: "auto"}}
				>
					<Typography variant={"h4"}>Filters</Typography>
					<FormGroup
						sx={{display: "flex", flexDirection: "row", alignItems: "flex-start"}}
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
				</Grid>
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
