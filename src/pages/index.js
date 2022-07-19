import React from "react";
import Home from "./Home";
import About from "./about";
import MyOpportunities from "./myopportunities";
import Catalog from "./catalog";
import Archives from "./archives";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavDrawer from "../comps/ui/NavDrawer";
import Box from "@mui/material/Box";


const Pages = () => {
    return (
        <div>
            <BrowserRouter>
                <NavDrawer/>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                    padding: "2rem",
                    flexDirection: "column",
                    maxWidth: "1200px",
                    margin: "auto"
                }}>
                    <Routes>
                        <Route path={"/"} element={<Home/>}/>
                        <Route path={"/about"} element={<About/>}/>
                        <Route path={"/catalog"} element={<Catalog/>}/>
                        <Route path={"/my-opportunities"} element={<MyOpportunities/>}/>
                        <Route path={"/archives"} element={<Archives/>}/>
                    </Routes>
                </Box>
            </BrowserRouter>
        </div>
    )
}

export default Pages;