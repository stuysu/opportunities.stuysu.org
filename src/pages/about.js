import React from "react";
import { Helmet } from "react-helmet";
import { Typography, Link, List, ListItem } from "@mui/material";

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
        <br />
        <Typography
          paragraph
          className={"text-center text-xl md:text-2xl lg:text-3xl block my-3"}
        >
          This website is made by the Student Union’s IT Department to allow all
          students to have access to an easy-to-use, centralized, and up-to-date
          list of all the opportunities available to them.
        </Typography>
        <Typography
          paragraph
          className={"text-center text-xl md:text-2xl lg:text-3xl block my-3"}
        >
          This website hosts a complete, updated compendium of various
          opportunities for Stuyvesant students to learn, grow, and explore,
          like internships, competitions, and courses to take during the summer
          and school year.
        </Typography>
        <Typography
          paragraph
          className={"text-center text-xl md:text-2xl lg:text-3xl block my-3"}
        >
          Note that to access the opportunities on this website, you need to
          sign in with a <code>stuy.edu</code> or <code>stuysu.org</code> email.
        </Typography>
        <Typography
          paragraph
          className={"text-center text-xl md:text-2xl lg:text-3xl block my-3"}
        >
          This website is open-source and we welcome anyone to look through the
          code and suggest bug fixes / changes. Feel free to email any issues
          you have or any suggestions to{" "}
          <Link href="mailto:it@stuysu.org" target="_blank" rel="noopener">
            it@stuysu.org
          </Link>
          .
          <br />
          Front-end:{" "}
          <Link
            href="https://github.com/stuysu/opportunities.stuysu.org"
            target="_blank"
            rel="noopener"
          >
            https://github.com/stuysu/opportunities.stuysu.org
          </Link>
          <br />
          Back-end:{" "}
          <Link
            href="https://github.com/stuysu/opportunities-api.stuysu.org"
            target="_blank"
            rel="noopener"
          >
            https://github.com/stuysu/opportunities-api.stuysu.org
          </Link>
        </Typography>
        <br />
        <Typography
          paragraph
          className={"text-center text-xl md:text-2xl lg:text-3xl block my-3"}
        >
          This site was made by the 2021-2022 and 2022-2023 Student Union IT
          Department Teams:
          <List
            sx={{
              listStyleType: "disc",
              "& .MuiListItem-root": {
                display: "list-item",
              },
              maxWidth: "650px",
              margin: "auto",
            }}
          >
            <ListItem>
              Yuhao "Ben" Pan, SU IT Co-Director '22-'23, SU IT '21-'22
            </ListItem>
            <ListItem>
              Chun Yeung "Frank" Wong, SU IT Co-Director '22-'23, SU IT '21-'22
            </ListItem>
            <ListItem>
              William Vongphanith, SU IT Assistant Director '22-'23
            </ListItem>
            <ListItem>David Chen, SU IT '21-'23</ListItem>
            <ListItem>Gus Watkins, SU IT '21-'23</ListItem>
            <ListItem>John Chandler III, SU IT '22-'23</ListItem>
            <ListItem>Anthony Chen, SU IT '22-'23</ListItem>
            <ListItem>Rahul Deb, SU IT '22-'23</ListItem>
            <ListItem>Yuchen Pan, SU IT '22-'23</ListItem>
            <ListItem>Naowal Rahman, SU IT '22-'23</ListItem>
            <ListItem>Randy Sim, SU IT '22-'23</ListItem>
            <ListItem>Vienna Tse, SU IT '22-'23</ListItem>
          </List>
        </Typography>
      </main>
    </div>
  );
};

export default About;
