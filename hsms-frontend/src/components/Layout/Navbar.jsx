import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleSidebar }) => {
  return (
    <AppBar position="fixed" elevation={2} sx={{ zIndex: 2000 }}>
      <Toolbar>
        <IconButton color="inherit" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Housing Society Management System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
