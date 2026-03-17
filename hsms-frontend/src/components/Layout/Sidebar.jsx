import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ReportIcon from "@mui/icons-material/Report";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaymentsIcon from "@mui/icons-material/Payments";

import { Link } from "react-router-dom";

const drawerWidth = 230;

const Sidebar = ({ open }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role; // admin | member

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#f5f5f5",
        },
      }}
    >
      <Toolbar />

      <List>
        {/* Dashboard — all */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Members — ADMIN ONLY */}
        {role === "admin" && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/members">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Members" />
            </ListItemButton>
          </ListItem>
        )}

        {/* Complaints — all */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/complaints">
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Complaints" />
          </ListItemButton>
        </ListItem>

        {/* Notices — all */}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/notices">
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notices" />
          </ListItemButton>
        </ListItem>

        {/* Maintenance — ADMIN ONLY */}
        {role === "admin" && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/maintenance">
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              <ListItemText primary="Maintenance" />
            </ListItemButton>
          </ListItem>
        )}

        {/* Maintenance — MEMBER ONLY */}
        {role === "member" && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/member/maintenance">
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              <ListItemText primary="Maintenance" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;
