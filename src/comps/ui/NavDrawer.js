import React from "react";

import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import {Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton} from "@mui/material";
import {Link} from "react-router-dom";

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
                <MenuRoundedIcon />
            </IconButton>

            <Drawer anchor={"left"} open={open} onClose={() => updateOpen(false)}>
                <List>
                    <ListItem disablePadding={true}>
                        <ListItemButton component={Link} to="/" onClick={() => updateOpen(false)}>
                            <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
                            <ListItemText primary={"Home"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding={true}>
                        <ListItemButton component={Link} to="/about" onClick={() => updateOpen(false)}>
                            <ListItemIcon><InfoRoundedIcon /></ListItemIcon>
                            <ListItemText primary={"About"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding={true}>
                        <ListItemButton component={Link} to="/catalog" onClick={() => updateOpen(false)}>
                            <ListItemIcon><ArticleRoundedIcon /></ListItemIcon>
                            <ListItemText primary={"Catalog"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding={true}>
                        <ListItemButton component={Link} to="/my-opportunities" onClick={() => updateOpen(false)}>
                            <ListItemIcon><AssignmentIndRoundedIcon /></ListItemIcon>
                            <ListItemText primary={"My Opportunities"}/>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding={true}>
                        <ListItemButton component={Link} to="/archives" onClick={() => updateOpen(false)}>
                            <ListItemIcon><ArchiveRoundedIcon /></ListItemIcon>
                            <ListItemText primary={"Archives"}/>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </nav>
    )
}

export default NavDrawer;
