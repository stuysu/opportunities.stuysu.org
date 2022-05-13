import React from "react";
import Home from "./Home";
import About from "./about";
import MyOpportunities from "./myopportunities";
import Catalog from "./catalog";
import Archives from "./archives";
import Admin from "./admin";

import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


const Pages = () => {
    return (
        <div>
            <BrowserRouter>
                <nav>
                    <Link to={"/"}>Home </Link> |
                    <Link to={"/about"}> About </Link> |
                    <Link to={"/catalog"}> Catalog </Link> |
                    <Link to={"/my-opportunities"}> My Opportunities </Link> |
                    <Link to={"/archives"}> Archives </Link> |
                    <Link to={"/admin"}> Admin </Link>
                </nav>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/about"} element={<About/>}/>
                    <Route path={"/catalog"} element={<Catalog/>}/>
                    <Route path={"/my-opportunities"} element={<MyOpportunities/>}/>
                    <Route path={"/archives"} element={<Archives/>}/>
                    <Route path={"/admin"} element={<Admin/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Pages;