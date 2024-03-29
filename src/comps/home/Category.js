import React from "react";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";

const Category = ({ name, icon }) => {
  return (
    <Link to={"/catalog"} state={{ category: name }}>
      <Chip icon={icon} label={name} onClick={() => {}} />
    </Link>
  );
};

export default Category;
