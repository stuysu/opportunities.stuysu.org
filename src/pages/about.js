import React from "react";
import { Helmet } from "react-helmet";
import { Typography } from "@mui/material";

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About</title>
      </Helmet>
      <main>
        <Typography
          variant={"h1"}
          className={"text-center text-2xl md:text-3xl lg:text-4xl font-bold"}
        >
          About
        </Typography>
        <Typography
          paragraph
          className={"text-center text-xl md:text-2xl lg:text-3xl block my-3"}
        >
          This website is made by the Student Union’s IT Department to allow all students to have access to an easy-to-use, centralized, and up-to-date list of all the opportunities available to them.
        </Typography>
        <Typography
          paragraph
          className={"text-center text-xl md:text-2xl lg:text-3xl block my-3"}
        >
          This website hosts a complete, updated compendium of various opportunities for Stuyvesant students to learn, grow, and explore, like internships, competitions, and courses to take during the summer and school year.
        </Typography>

      </main>
    </div>
  );
};

export default About;
