import React from "react";
import Home from "./Home";
import About from "./about";
import MyOpportunities from "./myopportunities";
import Catalog from "./catalog";
import Archives from "./archives";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavDrawer from "../comps/ui/NavDrawer";


const Pages = () => {
    return (
        <div>
            <BrowserRouter>
                <NavDrawer/>
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