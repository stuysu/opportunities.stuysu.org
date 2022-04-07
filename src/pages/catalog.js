import React from "react";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";
import OpportunityCard from "../comps/opportunities/OpportunityCard";

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
					<OpportunityCard title="Lorem Ipsum Dolor Sit Amet" date="April 7, 2022 - April 8, 2022" opportunityLocation="lorem ipsum" applicationDeadline={new Date("December 17, 1995 03:24:00")} description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Integer eget aliquet nibh praesent tristique magna. Nibh cras pulvinar mattis nunc sed blandit libero volutpat sed. Egestas pretium aenean pharetra magna ac placerat vestibulum. Quam quisque id diam vel quam. Ullamcorper a lacus vestibulum sed. Elit at imperdiet dui accumsan. Tortor dignissim convallis aenean et tortor at risus viverra adipiscing. Pharetra et ultrices neque ornare aenean euismod. Eu consequat ac felis donec et odio pellentesque diam volutpat. Amet mauris commodo quis imperdiet massa. Ligula ullamcorper malesuada proin libero nunc consequat."/>
                </main>
            </div>
        </div>
    )
}

export default Catalog;