import React from "react";
import Home from "./Home";
import About from "./about";
import MyOpportunities from "./myopportunities";
import Catalog from "./catalog";
import Archives from "./archives";
import Admin from "./admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../comps/context/UserContext";
import NavDrawer from "../comps/ui/NavDrawer";
import Box from "@mui/material/Box";
import "../tailwind.css";
import HTTP404 from "./404";
import OppRouter from "./opportunity/index.js";

const Pages = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
        <NavDrawer user={user} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            padding: "2rem",
            flexDirection: "column",
            maxWidth: "1200px",
            margin: "auto",
          }}
        >
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/catalog"} element={<Catalog />} />
            <Route path={"/my-opportunities"} element={<MyOpportunities />} />
            <Route path={"/archives"} element={<Archives />} />
            <Route path={"/admin"} element={<Admin />} />
            <Route path={"/opportunity/:oppId"} element={<OppRouter />} />
            <Route path={"*"} element={<HTTP404 />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
};

export default Pages;
