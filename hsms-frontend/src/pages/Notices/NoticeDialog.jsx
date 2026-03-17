import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const NoticeDialog = ({ open, onClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = () => {
    onAdd({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add Notice</DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={submitHandler}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoticeDialog;
