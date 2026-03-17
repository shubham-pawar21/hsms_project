import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  TextField,
  Stack,
  Tooltip,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import api from "../../api/axios";
import ComplaintDialog from "./ComplaintDialog";

const Complaints = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  // 🔹 Fetch complaints
  const fetchComplaints = async () => {
    try {
      const url = role === "admin" ? "/complaints" : "/complaints/my";
      const res = await api.get(url);
      setComplaints(res.data);
    } catch (err) {
      alert("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 🔹 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;

    try {
      await api.delete(`/complaints/${id}`);
      setComplaints((prev) => prev.filter((c) => c._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // 🔹 Admin status update
  const handleStatusChange = async (id, status) => {
    try {
      const res = await api.put(`/complaints/${id}`, { status });
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? res.data.complaint : c)),
      );
    } catch {
      alert("Status update failed");
    }
  };

  const filtered = complaints.filter((c) =>
    `${c.title} ${c.status}`.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Complaints
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" mb={2}>
          <TextField
            placeholder="Search complaints..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {role === "member" && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add Complaint
            </Button>
          )}
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((c) => (
              <TableRow key={c._id}>
                <TableCell>{c.title}</TableCell>

                <TableCell>
                  {role === "admin" ? (
                    <Select
                      size="small"
                      value={c.status}
                      onChange={(e) =>
                        handleStatusChange(c._id, e.target.value)
                      }
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                    </Select>
                  ) : (
                    <Chip label={c.status} size="small" />
                  )}
                </TableCell>

                <TableCell>
                  {new Date(c.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="View">
                    <IconButton onClick={() => setSelected(c)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(c._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No complaints found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <ComplaintDialog
        open={openDialog || Boolean(selected)}
        complaint={selected}
        role={role}
        onClose={() => {
          setOpenDialog(false);
          setSelected(null);
        }}
        onSaved={fetchComplaints}
      />
    </Box>
  );
};

export default Complaints;
