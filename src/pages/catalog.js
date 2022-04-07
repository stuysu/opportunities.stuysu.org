import React from "react";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";
import OpportunityCard from "../comps/opportunities/OpportunityCard";

const useStyles = makeStyles(() => ({
    layout: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

const Catalog = () => {
    const classes = useStyles();

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
					<OpportunityCard title="lorem ipsum" date="April 7, 2022 - April 8, 2022" opportunityLocation="lorem ipsum"/>
                </main>
            </div>
        </div>
    )
}

export default Catalog;