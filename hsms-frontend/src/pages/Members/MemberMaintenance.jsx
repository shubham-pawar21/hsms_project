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
  Chip,
  Button,
} from "@mui/material";

import { fetchMemberBillsAPI, payBillAPI } from "../../api/memberMaintenanceAPI";

const MemberMaintenance = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const data = await fetchMemberBillsAPI();
      setBills(data);
    } catch (err) {
      console.error("Failed to load bills:", err);
    }
  };

  // 🔹 Pay bill handler
  const handlePay = async (billId) => {
    if (!window.confirm("Are you sure you want to pay this bill?")) return;

    try {
      await payBillAPI(billId);
      alert("Bill paid successfully");
      loadBills(); // refresh table
    } catch (err) {
      alert(err.response?.data?.message || "Error paying bill");
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        My Maintenance Bills
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell> {/* 🔹 Action column */}
            </TableRow>
          </TableHead>

          <TableBody>
            {bills.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No maintenance bills found
                </TableCell>
              </TableRow>
            ) : (
              bills.map((b) => (
                <TableRow key={b._id}>
                  <TableCell>{b.month}</TableCell>
                  <TableCell>₹{b.amount}</TableCell>
                  <TableCell>
                    <Chip
                      label={b.status}
                      color={b.status === "Paid" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{new Date(b.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {/* 🔹 Pay button only if Pending */}
                    {b.status === "Pending" && (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handlePay(b._id)}
                      >
                        Pay
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default MemberMaintenance;
