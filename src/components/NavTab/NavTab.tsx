import React, { FC } from "react";
import { Link } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ITab } from "../../models/ITab";

interface NavTabProps {
  tab: ITab;
}

const NavTab: FC<NavTabProps> = ({ tab }) => {
  return (
    <Link to={tab.path}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{tab.icon}</ListItemIcon>
          <ListItemText primary={tab.name} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default NavTab;
