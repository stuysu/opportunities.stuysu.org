import React from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";

const Archives = () => {
  return (
    <div>
      <Helmet>
        <title>About</title>
      </Helmet>
      <main>
        <Typography paragraph>Archives page</Typography>
      </main>
    </div>
  );
};

export default Archives;
