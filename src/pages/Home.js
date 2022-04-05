import React from "react";
import {Helmet} from "react-helmet";
import UserHome from "../comps/home/UserHome";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <UserHome/>
        </div>
    )
}

export default Home;