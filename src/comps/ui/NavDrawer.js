import React from "react";

// import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import NavBarLink from "./NavBarLink.js";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ThemeContext } from "../context/ThemeProvider";

const NavDrawer = ({ user }) => {
  const [open, updateOpen] = React.useState(false);
  const theme = React.useContext(ThemeContext);
  return (
    <nav>
      <IconButton
        edge="start"
        sx={{
          marginTop: 2,
          marginLeft: 2,
        }}
        color="inherit"
        aria-label="menu"
        onClick={() => updateOpen(true)}
      >
        <MenuRoundedIcon />
      </IconButton>

      <Drawer anchor={"left"} open={open} onClose={() => updateOpen(false)}>
        <List>
          <NavBarLink
            label="Home"
            link="/"
            icon={<HomeRoundedIcon />}
            updateOpen={updateOpen}
          />
          <NavBarLink
            label="About"
            link="/about"
            icon={<InfoRoundedIcon />}
            updateOpen={updateOpen}
          />
          <NavBarLink
            label="Catalog"
            link="/catalog"
            icon={<ArticleRoundedIcon />}
            updateOpen={updateOpen}
          />
          <NavBarLink
            label="My Opportunities"
            link="/my-opportunities"
            icon={<AssignmentIndRoundedIcon />}
            updateOpen={updateOpen}
          />
          {/*<NavBarLink*/}
          {/*  label="Archives"*/}
          {/*  link="/archives"*/}
          {/*  icon={<ArchiveRoundedIcon />}*/}
          {/*  updateOpen={updateOpen}*/}
          {/*/>*/}
          {user?.isFaculty && (
            <NavBarLink
              label="Admin"
              link="/admin"
              icon={<AdminPanelSettingsIcon />}
              updateOpen={updateOpen}
            />
          )}
          {user && user.signedIn && (
            <>
              <NavBarLink
                label="Log out"
                link=""
                icon={<LogoutRoundedIcon />}
                updateOpen={(value) => {
                  user.logout();
                  updateOpen(value);
                }}
              />
            </>
          )}
          <ListItem disablePadding={true}>
            <ListItemButton onClick={theme.toggleColorMode}>
              <ListItemIcon>
                {theme.colorMode === "light" ? (
                  <Brightness4 />
                ) : (
                  <Brightness7 />
                )}
              </ListItemIcon>
              <ListItemText primary={`Toggle dark mode`} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </nav>
  );
};

export default NavDrawer;
