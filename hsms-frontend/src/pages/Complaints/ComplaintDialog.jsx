import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import api from "../../api/axios";

const ComplaintDialog = ({ open, onClose, onSaved, complaint, role }) => {
  const isViewOnly = role === "admin";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (complaint) {
      setTitle(complaint.title);
      setDescription(complaint.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [complaint]);

  // ❌ Admin should never submit
  const handleSubmit = async () => {
    if (isViewOnly) return;

    if (!title || !description) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("/complaints", { title, description });
      onSaved();
      onClose();
    } catch {
      alert("Failed to add complaint");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        {isViewOnly ? "View Complaint" : "Add Complaint"}
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          disabled={isViewOnly}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={description}
          disabled={isViewOnly}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>

        {!isViewOnly && (
          <Button variant="contained" onClick={handleSubmit}>
            Add Complaint
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ComplaintDialog;
