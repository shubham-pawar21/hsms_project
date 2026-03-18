import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "member",
    flatNo: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password || !form.cpassword)
      return alert("Please fill all fields");

    if (form.password !== form.cpassword)
      return alert("Passwords do not match");

    if (form.role === "member" && (!form.flatNo || !form.phone))
      return alert("Flat Number and Phone are required");

    try {
      await axios.post("https://hsms-project.onrender.com/api/auth/register", {
        ...form,
        flatNo: form.role === "member" ? form.flatNo : undefined,
        phone: form.role === "member" ? form.phone : undefined,
      });

      alert("Registration successful. Please login.");
      navigate("/login"); // redirect to login as before
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

        {/* Password with toggle */}
        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Confirm Password with toggle */}
        <TextField
          fullWidth
          label="Confirm Password"
          name="cpassword"
          type={showCPassword ? "text" : "password"}
          value={form.cpassword}
          onChange={handleChange}
          sx={{ mb: 3 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowCPassword(!showCPassword)}>
                  {showCPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button fullWidth variant="contained" onClick={handleRegister}>
          Register
        </Button>

        <Typography mt={2} textAlign="center">
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
