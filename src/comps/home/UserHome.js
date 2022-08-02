import React from "react";
import layout from "./../../styles/Layout.module.css";
import { Typography } from "@mui/material";

const UserHome = () => {
  return (
    <div className={layout.container}>
      <Typography variant={"h1"}>
        Welcome to the Stuyvesant Opportunities Bulletin!
      </Typography>
    </div>
  );
};

export default UserHome;
