import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import UserHome from "../comps/home/UserHome";
import UnauthenticatedLanding from "../comps/home/UnauthenticatedLanding";
import UserContext from "../comps/context/UserContext";
import layout from "../styles/Layout.module.css";
import { Typography } from "@mui/material";
import opportunities from "../img/vector/clip-online-education.svg";

const Home = () => {
    const user = useContext(UserContext);
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className={layout.container}>
                <Typography className={layout.title} variant={"h1"}>
                    Welcome to the Stuyvesant Opportunities Bulletin!
                </Typography>
                <img
                    src={opportunities}
                    alt="Various objects, including a rocket ship, a microscope, and a notebook, pop out of a computer monitor."
                    style={{
                        width: "24rem",
			height: "18rem"
                    }}
                />

            </div>
            {user.signedIn ? <UserHome /> : <UnauthenticatedLanding />}
        </div>
    );
};

export default Home;
