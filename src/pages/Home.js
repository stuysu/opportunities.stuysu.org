import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import UserHome from "../comps/home/UserHome";
import GoogleLoginButton from "../comps/auth/GoogleLoginButton";
import UserContext from "../comps/context/UserContext";
import opportunities from "../img/vector/goodstudio-reaching-for-opportunities.svg";
import { CircularProgress, Typography, Link, Grid } from "@mui/material";

// TEMP BECAUSE MATERIAL UI IS GARBAGE
let textBlockStyles = {
  marginTop: "1rem",
};
let textCell = "px-4 py-0";

const Home = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="inline-block">
        <Grid container className={"py-4"}>
          <Grid item xs={12} md={6} className={textCell}>
            <img
              className={"max-w-[80vw] w-[400px] p-4"}
              src={opportunities}
              alt={"opportunities"}
            />
          </Grid>
          <Grid item xs={12} md={6} className={textCell}>
            <Typography
              variant={"h1"}
              className={
                "text-center md:text-left text-2xl md:text-3xl lg:text-4xl font-bold inline-block"
              }
              style={textBlockStyles}
            >
              Welcome to the Stuyvesant Opportunities Bulletin!
            </Typography>
            <Typography
              variant={"p"}
              className={"text-center md:text-left inline-block"}
              style={textBlockStyles}
            >
              The largest compendium of opportunities for Stuyvesant students to
              learn, grow, and explore.
            </Typography>
            <Typography
              variant={"p"}
              className={"text-center md:text-left inline-block"}
              style={textBlockStyles}
            >
              If you're not a Stuyvesant student, staff, or faculty member, you
              will still be able to browse our website, but your features will
              be limited.
            </Typography>
            <Typography
              variant={"p"}
              className={"text-center md:text-left inline-block"}
              style={textBlockStyles}
            >
              If you're an organization or business looking to advertise opportunities for Stuyvesant students,
              fill out this <Link href={"https://forms.gle/FnXCKhnEmKHepwqU7"}>submission form</Link>.
            </Typography>
            <Typography
              variant={"p"}
              className={"text-center md:text-left inline-block"}
              style={textBlockStyles}
            >
              Contact the <Link href={"mailto:it@stuysu.org"}>IT team</Link> if you have any questions, concerns, or suggestions.
            </Typography>
          </Grid>
        </Grid>
        {user.loading ? (
          <CircularProgress />
        ) : user.signedIn ? (
          <UserHome />
        ) : (
          <GoogleLoginButton />
        )}
      </div>
    </div>
  );
};

export default Home;
