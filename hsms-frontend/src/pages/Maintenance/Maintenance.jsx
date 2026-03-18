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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";

import MaintenanceDialog from "./MaintenanceDialog";
import axios from "axios"; // ✅ ADD THIS

import {
  fetchBillsAPI,
  addBillAPI,
  updateBillAPI,
  deleteBillAPI,
} from "../../api/maintenanceAPI";

const Maintenance = () => {
  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    const data = await fetchBillsAPI();
    setBills(data);
  };

  const filtered = bills.filter((b) =>
    `${b.flatNo} ${b.memberName} ${b.month} ${b.status}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bill?")) return;
    await deleteBillAPI(id);
    loadBills();
  };

  const handleSave = async (data) => {
    if (data._id) {
      await updateBillAPI(data._id, data);
    } else {
      await addBillAPI(data);
    }
    setOpenDialog(false);
    setSelectedBill(null);
    loadBills();
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Maintenance Bills
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <TextField
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Bill
          </Button>
          {/* ✅ NEW BUTTON */}
          <Button
            variant="contained"
            color="success"
            onClick={async () => {
              try {
                await axios.post(
                  "https://hsms-project.onrender.com/api/maintenance/generate",
                  {},
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  },
                );
                alert("Maintenance Generated");
                loadBills();
              } catch (err) {
                alert("Error generating maintenance");
              }
            }}
          >
            Generate For All
          </Button>
        </Stack>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flat</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((b) => (
              <TableRow key={b._id}>
                <TableCell>{b.flatNo}</TableCell>
                <TableCell>{b.memberName}</TableCell>
                <TableCell>{b.month}</TableCell>
                <TableCell>₹{b.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={b.status}
                    color={b.status === "Paid" ? "success" : "error"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(b.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => {
                      setSelectedBill(b);
                      setOpenDialog(true);
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDelete(b._id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <MaintenanceDialog
        open={openDialog}
        bill={selectedBill}
        onClose={() => {
          setOpenDialog(false);
          setSelectedBill(null);
        }}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Maintenance;
