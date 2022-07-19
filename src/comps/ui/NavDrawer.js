import React from "react";

import {ArchiveRounded, ArticleRounded, AssignmentIndRounded, HomeRounded, InfoRounded, MenuRounded} from "@mui/icons-material";

import {Drawer, IconButton, List} from "@mui/material";
import NavBarLink from './NavBarLink.js';

const NavDrawer = () => {
    const [open, updateOpen] = React.useState(false);
    return (
        <nav>
            <IconButton
                edge="start"
                sx={{
                    marginTop: 2,
                    marginLeft: 2
                }}
                color="inherit"
                aria-label="menu"
                onClick={() => updateOpen(true)}
            >
                <MenuRounded />
            </IconButton>

            <Drawer anchor={"left"} open={open} onClose={() => updateOpen(false)}>
                <List>
                    <NavBarLink label="Home" link="/" icon={<HomeRounded />} updateOpen={updateOpen}/>
                    <NavBarLink label="About" link="/about" icon={<InfoRounded />} updateOpen={updateOpen}/>
                    <NavBarLink label="Catalog" link="/catalog" icon={<ArticleRounded />} updateOpen={updateOpen}/>
                    <NavBarLink label="My Opportunities" link="/my-opportunities" icon={<AssignmentIndRounded />} updateOpen={updateOpen}/>
                    <NavBarLink label="Archives" link="/archives" icon={<ArchiveRounded />} updateOpen={updateOpen}/>
                </List>
            </Drawer>
        </nav>
    )
}

export default NavDrawer;
