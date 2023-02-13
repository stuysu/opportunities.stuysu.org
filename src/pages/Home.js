import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import UserHome from "../comps/home/UserHome";
import GoogleLoginButton from "../comps/auth/GoogleLoginButton";
import UserContext from "../comps/context/UserContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import opportunities from "../img/vector/clip-online-education.svg";

const layout = {
    container: {
        minHeight: "25vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 1400,
        margin: "2rem",
    },
    main: {
        padding: "2.5rem 0.5rem",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        width: "100%",
        height: 100,
        borderTop: "1px solid #eaeaea",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        minHeight: "25vh",
        width: "70%",
        margin: "auto",
    },

    description: {
        textAlign: "center",
        lineHeight: 1.5,
        fontSize: "1.5rem",
    },

    cardMedia: {
        height: 200,
    },

    card: {
        width: "100%",
    },

    imageFit: {
        objectFit: "contain",
        maxWidth: "100%",
        borderRadius: 5,
    },

    alignLeft: {
        textAlign: "left",
    },

    backButtonContainer: {
        width: "100%",
    },

    backButtonArrow: {
        height: 15,
    },
};

const Home = () => {
    const user = useContext(UserContext);
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Box sx={layout.container}>
                <Typography sx={layout.title} variant={"h1"}>
                    Welcome to the Stuyvesant Opportunities Bulletin!
                </Typography>
                <img
                    src={opportunities}
                    alt="Various objects, including a rocket ship, a microscope, and a notebook, pop out of a computer monitor."
                    style={{
                        width: "24rem",
                        height: "18rem",
                    }}
                />
            </Box>
            {user.loading ? <CircularProgress /> : (user.signedIn ? <UserHome /> : <GoogleLoginButton />)}
        </div>
    );
};

export default Home;
