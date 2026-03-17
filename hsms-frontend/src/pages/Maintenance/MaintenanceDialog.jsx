import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

import { fetchMembers } from "../../api/memberAPI";

const MaintenanceDialog = ({ open, onClose, bill, onSave }) => {
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    flatNo: "",
    memberName: "",
    month: "",
    amount: "",
    dueDate: "",
    status: "Pending",
  });

  useEffect(() => {
    if (bill) setForm(bill);
  }, [bill]);

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const res = await fetchMembers();
        setMembers(res.data);
      } catch (error) {
        console.error("Failed to load members");
      }
    };

    loadMembers();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleMemberSelect = (id) => {
    const member = members.find((m) => m._id === id);

    if (member) {
      setForm({
        ...form,
        memberName: member.name,
        flatNo: member.flatNumber,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{bill ? "Edit Bill" : "Add Bill"}</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* Member Dropdown */}
          <TextField
            select
            label="Select Member"
            onChange={(e) => handleMemberSelect(e.target.value)}
          >
            {members.map((m) => (
              <MenuItem key={m._id} value={m._id}>
                {m.name} - {m.flatNumber}
              </MenuItem>
            ))}
          </TextField>

          {/* Flat Number Auto Fill */}
          <TextField
            label="Flat No"
            name="flatNo"
            value={form.flatNo}
            disabled
          />

          {/* Member Name Auto Fill */}
          <TextField
            label="Member Name"
            name="memberName"
            value={form.memberName}
            disabled
          />

          <TextField
            label="Month"
            name="month"
            value={form.month}
            onChange={handleChange}
          />

          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />

          <TextField
            label="Due Date"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(form)}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaintenanceDialog;
