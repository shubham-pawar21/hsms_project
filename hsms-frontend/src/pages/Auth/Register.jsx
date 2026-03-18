import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "member",
    flatNo: "",
    phone: "", // ✅ ADDED
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.cpassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.cpassword) {
      alert("Passwords do not match");
      return;
    }

    if (form.role === "member" && (!form.flatNo || !form.phone)) {
      alert("Flat Number and Phone are required");
      return;
    }

    try {
      await axios.post("https://hsms-project.onrender.com/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        flatNo: form.role === "member" ? form.flatNo : undefined,
        phone: form.role === "member" ? form.phone : undefined, // ✅ ADDED
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: 400, p: 4 }}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Register
        </Typography>

        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          select
          label="Role"
          name="role"
          value={form.role}
          onChange={handleChange}
          sx={{ mb: 2 }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="member">Member</MenuItem>
        </TextField>

        {form.role === "member" && (
          <>
            <TextField
              fullWidth
              label="Flat Number"
              name="flatNo"
              value={form.flatNo}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* ✅ NEW PHONE FIELD */}
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
          </>
        )}

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          name="cpassword"
          type="password"
          value={form.cpassword}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        <Button fullWidth variant="contained" onClick={handleRegister}>
          Register
        </Button>
      </Paper>
    </Box>
  );
};

export default Register;
