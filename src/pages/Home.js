import React, {useState} from "react";
import {Helmet} from "react-helmet";
import UserHome from "../comps/home/UserHome";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";

import {SchoolRounded, WorkRounded, VolunteerActivismRounded, GavelRounded, ColorLensRounded, ForestRounded, ScienceRounded, LocalHospitalRounded, TheaterComedyRounded, MoneyRounded, HelpRounded, MoneyOffCsredRounded, Search} from '@mui/icons-material';

import GoogleLoginButton from "../comps/auth/GoogleLoginButton";

const buttons_left = [
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 2}}
        startIcon={<SchoolRounded />}
    >
        Academic Programs
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 3}}
        startIcon={<WorkRounded />}
    >
        Business and Jobs
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 4}}
        startIcon={<VolunteerActivismRounded />}
    >
        Community Service
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 5}}
        startIcon={<GavelRounded />}
    >
        Leadership, Government, International
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 6}}
        startIcon={<ColorLensRounded />}
    >
        Museum, Art, Design
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 7}}
        startIcon={<ForestRounded />}
    >
        Parks, Zoo, Nature
    </Button>,
]
const buttons_right = [
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 8}}
        startIcon={<ScienceRounded />}
    >
        Engineering, Math, Computer Science
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 9}}
        startIcon={<LocalHospitalRounded />}
    >
        Medical, Life Sciences
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 10}}
        startIcon={<TheaterComedyRounded />}
    >
        Theater, Music, Writing, Videos
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 11}}
        startIcon={<MoneyRounded />}
    >
        Contests, Competitions
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 12}}
        startIcon={<HelpRounded />}
    >
        Additional Links and Resources
    </Button>,
    <Button 
        component={Link}
        to={"/catalog"}
        state={{category: 13}}
        startIcon={<MoneyOffCsredRounded />}
    >
        Scholarships
    </Button>,
]

const Home = () => {
    const [search, setSearch] = useState("");

    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <UserHome/>
            <Box
                sx={{
                    margin: 'auto',
                    paddingBottom: "4vh",
                    width: '50vw',
                }}
            >
                <TextField fullWidth id="fullWidth" label="Search for an opportunity..." color="secondary" autoFocus={true}
                           onChange={(event) => setSearch(event.target.value)}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <Link to={`/catalog?q=${search}`}>
                                           <IconButton
                                               aria-label={"search"}
                                           >
                                               <Search />
                                           </IconButton>
                                       </Link>
                                   </InputAdornment>
                               )
                           }}
                />
            </Box>

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <ButtonGroup
                    orientation="vertical"
                >
                    {buttons_left}
                </ButtonGroup>
                <ButtonGroup
                    orientation="vertical"
                >
                    {buttons_right}
                </ButtonGroup>
            </Box>
			<GoogleLoginButton />
        </div>
    )
}

export default Home;