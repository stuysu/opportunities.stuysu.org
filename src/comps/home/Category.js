import React from "react";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";

const Category = ({ name, id, icon }) => {
  return (
    <Link to={"/catalog"} state={{ category: id }}>
      <Chip icon={icon} label={name} onClick={() => {}} />
    </Link>
  );
};

export default Category;
