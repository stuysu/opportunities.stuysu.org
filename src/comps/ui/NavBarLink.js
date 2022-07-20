import React from "react";
import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {NavLink} from "react-router-dom";


/**
 * Creates a ListItem for the NavDrawer component.
 * @constructor
 * @param {Object} props - React properties (described below)
 * @property {string} label - User-facing label of the element
 * @property {string} link - URL to the target page
 * @property {JSX} icon - (Material UI) icon to display on the list
 * @property {function} updateOpen - updateOpen(bool) function from the parent NavDrawer
 */
const NavBarLink = (props) => {
    const activeStyle = {backgroundColor: 'rgba(0, 0, 0, 0.04)'};

    return (
        <ListItem disablePadding={true}>
            <ListItemButton component={NavLink} to={props.link}
                            onClick={() => props.updateOpen(false)}
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
            >
                <ListItemIcon>{props.icon}</ListItemIcon>
                <ListItemText primary={props.label}/>
            </ListItemButton>
        </ListItem>
    )
}

export default NavBarLink;
