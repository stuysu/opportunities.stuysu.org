import React from "react";
import {makeStyles} from "@mui/styles";
import Typography from "@mui/material/Typography";
import {Helmet} from "react-helmet";

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

const About = () => {
    const classes = useStyles();

    return (
        <div>
            <Helmet>
                <title>About</title>
            </Helmet>
            <div className={classes.layout}>
                <main>
                    <Typography paragraph>
                        About page
                    </Typography>
                </main>
            </div>
        </div>
    )
}

export default About;