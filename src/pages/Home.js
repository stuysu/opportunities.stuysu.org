import React, { useState } from "react";
import { Helmet } from "react-helmet";
import UserHome from "../comps/home/UserHome";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import ColorLensRoundedIcon from "@mui/icons-material/ColorLensRounded";
import ForestRoundedIcon from "@mui/icons-material/ForestRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import TheaterComedyRoundedIcon from "@mui/icons-material/TheaterComedyRounded";
import MoneyRoundedIcon from "@mui/icons-material/MoneyRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import MoneyOffCsredRoundedIcon from "@mui/icons-material/MoneyOffCsredRounded";
import SearchIcon from "@mui/icons-material/Search";

import GoogleLoginButton from "../comps/auth/GoogleLoginButton";

const buttons_left = [
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 2 }}
    startIcon={<SchoolRoundedIcon />}
  >
    Academic Programs
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 3 }}
    startIcon={<WorkRoundedIcon />}
  >
    Business and Jobs
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 4 }}
    startIcon={<VolunteerActivismRoundedIcon />}
  >
    Community Service
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 5 }}
    startIcon={<GavelRoundedIcon />}
  >
    Leadership, Government, International
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 6 }}
    startIcon={<ColorLensRoundedIcon />}
  >
    Museum, Art, Design
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 7 }}
    startIcon={<ForestRoundedIcon />}
  >
    Parks, Zoo, Nature
  </Button>,
];
const buttons_right = [
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 8 }}
    startIcon={<ScienceRoundedIcon />}
  >
    Engineering, Math, Computer Science
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 9 }}
    startIcon={<LocalHospitalRoundedIcon />}
  >
    Medical, Life Sciences
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 10 }}
    startIcon={<TheaterComedyRoundedIcon />}
  >
    Theater, Music, Writing, Videos
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 11 }}
    startIcon={<MoneyRoundedIcon />}
  >
    Contests, Competitions
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 12 }}
    startIcon={<HelpRoundedIcon />}
  >
    Additional Links and Resources
  </Button>,
  <Button
    component={Link}
    to={"/catalog"}
    state={{ category: 13 }}
    startIcon={<MoneyOffCsredRoundedIcon />}
  >
    Scholarships
  </Button>,
];

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <UserHome />
      <Box
        sx={{
          margin: "auto",
          paddingBottom: "4vh",
          width: "50vw",
        }}
      >
        <TextField
          fullWidth
          id="fullWidth"
          label="Search for an opportunity..."
          color="secondary"
          autoFocus={true}
          onChange={(event) => setSearch(event.target.value)}
          onKeyDown={(event) => console.log("submit", event)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                  <IconButton onClick={} aria-label={"search"}>
                    <SearchIcon />
                  </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center">
        <ButtonGroup orientation="vertical">{buttons_left}</ButtonGroup>
        <ButtonGroup orientation="vertical">{buttons_right}</ButtonGroup>
      </Box>
      <GoogleLoginButton />
    </div>
  );
};

export default Home;
