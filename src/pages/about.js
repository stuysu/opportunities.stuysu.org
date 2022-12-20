import React from "react";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About</title>
      </Helmet>
      <main>
        <Typography paragraph>About page</Typography>
      </main>
    </div>
  );
};

export default About;
