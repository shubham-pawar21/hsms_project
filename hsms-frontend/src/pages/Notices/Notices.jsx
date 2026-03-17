import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

import { fetchNotices, createNotice, deleteNotice } from "../../api/noticeApi";

const Notices = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [notices, setNotices] = useState([]);
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    message: "",
    image: null,
  });

  const loadNotices = async () => {
    const res = await fetchNotices();
    setNotices(res.data);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleAdd = async () => {
    if (!form.title || !form.message) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("message", form.message);

    if (form.image) {
      formData.append("image", form.image);
    }

    await createNotice(formData);

    setForm({
      title: "",
      message: "",
      image: null,
    });

    setOpen(false);
    loadNotices();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    await deleteNotice(id);
    loadNotices();
  };

  const handleDownload = async (imageUrl) => {
    if (!imageUrl) return;

    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "notice-image.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Notices
      </Typography>

      <Paper sx={{ p: 2 }}>
        {role === "admin" && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mb: 2 }}
            onClick={() => setOpen(true)}
          >
            Add Notice
          </Button>
        )}

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Message</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {notices.map((n) => (
              <TableRow key={n._id}>
                <TableCell>
                  {n.image && (
                    <img
                      src={n.image}
                      alt="notice"
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => setPreviewImage(n.image)}
                    />
                  )}
                </TableCell>

                <TableCell>{n.title}</TableCell>
                <TableCell>{n.message}</TableCell>

                <TableCell>
                  {new Date(n.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell align="right">
                  <Tooltip title="Download">
                    <IconButton
                      color="primary"
                      onClick={() => handleDownload(n.image)}
                    >
                      <DownloadIcon />
                    </IconButton>
                  </Tooltip>

                  {role === "admin" && (
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(n._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {notices.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No notices available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* Add Notice Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Notice</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            sx={{ mb: 2 }}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            style={{ marginTop: "15px" }}
            onChange={(e) =>
              setForm({
                ...form,
                image: e.target.files[0],
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview */}
      <Dialog
        open={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        maxWidth="md"
      >
        <DialogContent>
          {previewImage && (
            <img
              src={previewImage}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Notices;
