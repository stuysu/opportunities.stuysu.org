import React from "react";
import Box from "@mui/material/Box";
import Category from "./Category";
import SearchBar from "./SearchBar";

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

const tags = [
  { id: 2, name: "Academic Programs", icon: SchoolRoundedIcon },
  { id: 3, name: "Business and Jobs", icon: WorkRoundedIcon },
  { id: 4, name: "Community Service", icon: VolunteerActivismRoundedIcon },
  {
    id: 5,
    name: "Leadership, Government, International",
    icon: GavelRoundedIcon,
  },
  { id: 6, name: "Museum, Art, Design", icon: ColorLensRoundedIcon },
  { id: 7, name: "Parks, Zoo, Nature", icon: ForestRoundedIcon },
  {
    id: 8,
    name: "Engineering, Math, Computer Science",
    icon: ScienceRoundedIcon,
  },
  { id: 9, name: "Medical, Life Sciences", icon: LocalHospitalRoundedIcon },
  {
    id: 10,
    name: "Theater, Music, Writing, Videos",
    icon: TheaterComedyRoundedIcon,
  },
  { id: 11, name: "Contests, Competitions", icon: MoneyRoundedIcon },
  { id: 12, name: "Additional Links and Resources", icon: HelpRoundedIcon },
  { id: 13, name: "Scholarships", icon: MoneyOffCsredRoundedIcon },
];

const UserHome = () => {
  return (
    <div>
      <Box
        sx={{
          margin: "auto",
          paddingBottom: "4vh",
          width: "50vw",
        }}
      >
        <SearchBar />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignContent="space-between"
        flexWrap="wrap"
      >
        {tags.map((tag) => (
          <Box
            key={tag.id}
            component="span"
            paddingBottom="1%"
            className="px-2"
          >
            <Category
              id={tag.id}
              icon={<tag.icon fontSize="small" />}
              name={tag.name}
            />
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default UserHome;
