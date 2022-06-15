import React from "react";
import Home from "./Home";
import About from "./about";
import MyOpportunities from "./myopportunities";
import Catalog from "./catalog";
import Archives from "./archives";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../comps/context/UserContext";
import {Button} from "@mui/material";

const Pages = () => {
	const user = useContext(UserContext);
	//console.log(user);
    return (
        <div>
            <BrowserRouter>
                <nav>
                    <Link to={"/"}>Home </Link> |
                    <Link to={"/about"}> About </Link> |
                    <Link to={"/catalog"}> Catalog </Link> |
                    <Link to={"/my-opportunities"}> My Opportunities </Link> |
                    <Link to={"/archives"}> Archives </Link>
					{(user.signedIn && <>
						| <Button variant="text" onClick={user.logout}>Log Out</Button>
					</>)}
                </nav>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/about"} element={<About/>}/>
                    <Route path={"/catalog"} element={<Catalog/>}/>
                    <Route path={"/my-opportunities"} element={<MyOpportunities/>}/>
                    <Route path={"/archives"} element={<Archives/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Pages;