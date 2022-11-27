import React from "react";
import { tabsInfo } from "../Sidebar/constants";
import { Drawer, Toolbar, Divider, List } from "@mui/material";
import NavTab from "../NavTab/NavTab";
import { Link } from "react-router-dom";
import { Paths } from "../../constants/paths";
import { alts } from "../../constants/alts";
import Logo from "../../assets/Logo.min.svg";

const DRAWER_WIDTH = 240;

export const NavTabs = () => {
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <Link to={Paths.Home}>
          <img
            src={Logo}
            width={60}
            height={60}
            alt={alts.LOGO}
            loading="lazy"
          />
        </Link>
      </Toolbar>
      <Divider />
      <List>
        {tabsInfo.map((tab, index) => (
          <NavTab key={index} tab={tab} />
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};
