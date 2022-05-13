import React, { useState } from "react";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";
import OpportunityList from "../comps/opportunities/OpportunityList";
import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(() => ({
    layout: {
        display: "flex",
        justifyContent: "center",
        alignItems: "left",
        minHeight: "80vh",
        padding: "2rem",
        flexDirection: "column",
        maxWidth: "1200px",
        margin: "auto"
    },

    title: {
        textAlign: "center",
        margin: "1rem"
    }
}));

const QUERY = gql`
	query Opportunities(
		$categories: [Int]
		$eligibilities: [Int]
	) {
		opportunities(
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
    const classes = useStyles();
	let location = useLocation();
	let categories = [location.state?.category];
	let eligibilities = location.state?.eligibilities;

	const { data, loading, error } = useQuery(QUERY, {
		variables: {
			categories,
			eligibilities
		}
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

    return (
        <div>
            <Helmet>
                <title>Catalog</title>
            </Helmet>
            <div className={classes.layout}>
                <main>
                    <Typography paragraph>
                        Catalog page
                    </Typography>
					<OpportunityList opportunities={data}/>
				</main>
            </div>
        </div>
    )
}

export default Catalog;