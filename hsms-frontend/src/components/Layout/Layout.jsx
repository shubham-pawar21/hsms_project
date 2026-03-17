import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* NAVBAR */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", ml: 1 }}
          >
            Housing Society Management System
          </Typography>

          {/* RIGHT SIDE */}
          <Box>
            {token ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ mr: 2, display: "inline-block" }}
                >
                  {user?.name} ({user?.role})
                </Typography>

                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button color="inherit" onClick={() => navigate("/register")}>
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Sidebar open={open} />

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: open ? "230px" : "70px",
          transition: "0.3s",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
