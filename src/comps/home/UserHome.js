import React from "react";
import layout from "./../../styles/Layout.module.css";
import {Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    greeting: {
        margin: "2rem"
    }
});

const UserHome = () => {
    const classes = useStyles();

    return (
        <div className={layout.container}>
            <Typography variant={"h1"} className={classes.greeting}>
                Welcome to the Stuyvesant Opportunities Bulletin!
            </Typography>
        </div>
    )
}

export default UserHome;