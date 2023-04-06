import React from "react";
import { Helmet } from "react-helmet";
import { Typography, Link } from "@mui/material";

let contributors = [
  {
    name: 'Yuhao "Ben" Pan',
    role: "SU IT Co-Director '22-'23, SU IT '21-'22",
  },
  {
    name: 'Chun Yeung "Frank" Wong',
    role: "SU IT Co-Director '22-'23, SU IT '21-'22",
  },
  {
    name: "William Vongphanith",
    role: "SU IT Assistant Director '22-'23",
  },
  {
    name: "David Chen",
    role: "SU IT '21-'23",
  },
  {
    name: "Gus Watkins",
    role: "SU IT '21-'23",
  },
  {
    name: "John Chandler III",
    role: "SU IT '22-'23",
  },
  {
    name: "Anthony Chen",
    role: "SU IT '22-'23",
  },
  {
    name: "Rahul Deb",
    role: "SU IT '22-'23",
  },
  {
    name: "Yuchen Pan",
    role: "SU IT '22-'23",
  },
  {
    name: "Naowal Rahman",
    role: "SU IT '22-'23",
  },
  {
    name: "Randy Sim",
    role: "SU IT '22-'23",
  },
  {
    name: "Vienna Tse",
    role: "SU IT '22-'23",
  },
];

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
          Stuyvesant Opportunities Bulletin would not be possible without the
          many contributors who've helped make it what it is today. Here are the
          people who've contributed to the project:
          <table className="table-auto w-full">
            {contributors.map((contributor) => (
              <tr>
                <td className="text-left font-bold">{contributor.name}</td>
                <td className="text-right">
                  <i>{contributor.role}</i>
                </td>
              </tr>
            ))}
          </table>
        </Typography>
      </main>
    </div>
  );
};

export default About;
