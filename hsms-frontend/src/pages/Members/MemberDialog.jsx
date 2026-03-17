import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const MemberDialog = ({ open, onClose, member, onSave }) => {
  const isEdit = Boolean(member);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    flatNumber: "",
  });

  useEffect(() => {
    if (member) {
      setForm({
        _id: member._id,
        name: member.name,
        email: member.email,
        phone: member.phone,
        flatNumber: member.flatNumber,
      });
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        flatNumber: "",
      });
    }
  }, [member]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Member" : "Add Member"}</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="phone"
            label="Phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="flatNumber"
            label="Flat Number"
            value={form.flatNumber}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Save Changes" : "Add Member"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberDialog;
