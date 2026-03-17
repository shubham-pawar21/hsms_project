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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";

import MemberDialog from "./MemberDialog";

import {
  fetchMembers,
  addMember,
  updateMember,
  deleteMember,
} from "../../api/memberAPI";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // 🔥 Load members from backend
  const loadMembers = async () => {
    try {
      const res = await fetchMembers();
      setMembers(res.data);
    } catch (error) {
      alert("Failed to load members");
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const filtered = members.filter((m) =>
    `${m.name} ${m.email} ${m.flatNumber} ${m.phone}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    await deleteMember(id);
    loadMembers();
  };

  const handleOpenDialog = (member = null) => {
    setSelectedMember(member);
    setOpenDialog(true);
  };

  const handleSave = async (data) => {
    try {
      if (data._id) {
        await updateMember(data._id, data);
      } else {
        await addMember(data);
      }

      loadMembers();
      setOpenDialog(false);
      setSelectedMember(null);
    } catch (error) {
      alert(error.response?.data?.message || "Error saving member");
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Members
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <TextField
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            sx={{ width: 300 }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Member
          </Button>
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Flat</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Joined</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((m) => (
              <TableRow key={m._id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.flatNumber}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.phone}</TableCell>
                <TableCell>
                  {new Date(m.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="View">
                    <IconButton onClick={() => handleOpenDialog(m)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(m)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(m._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No members found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      <MemberDialog
        open={openDialog}
        member={selectedMember}
        onClose={() => setOpenDialog(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Members;
