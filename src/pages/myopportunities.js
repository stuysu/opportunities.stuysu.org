import React from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";

const MyOpportunities = () => {
  return (
    <div>
      <Helmet>
        <title>My Opportunities</title>
      </Helmet>
      <main>
        <Typography paragraph>My opportunities page</Typography>
      </main>
    </div>
  );
};

export default MyOpportunities;
