import React, { useEffect, useState } from "react";
import { fetchMemberDashboard } from "../../api/dashboardAPI";
import { fetchNotices } from "../../api/noticeApi";

import { Box, Typography, Grid, Paper } from "@mui/material";

const Card = ({ title, value, bg }) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 2,
      bgcolor: bg,
      color: "#fff",
      textAlign: "center",
    }}
  >
    <Typography variant="h6">{title}</Typography>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

const MemberDashboard = () => {
  const [stats, setStats] = useState({
    myComplaints: 0,
    notices: 0,
    pendingBills: 0,
  });

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchMemberDashboard();
      setStats(res.data);

      const noticeRes = await fetchNotices();
      setNotices(noticeRes.data.slice(0, 3)); // latest 3 notices
    };

    load();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4} color="white">
        Member Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card title="My Complaints" value={stats.myComplaints} bg="#e91e63" />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card title="Notices" value={stats.notices} bg="#ff9800" />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            title="Pending Bills"
            value={`₹ ${stats.pendingBills}`}
            bg="#4caf50"
          />
        </Grid>
      </Grid>

      {/* Latest Notices */}

      <Typography variant="h5" mt={5} mb={2} color="white">
        Latest Notices
      </Typography>

      <Grid container spacing={2}>
        {notices.map((n) => (
          <Grid item xs={12} md={4} key={n._id}>
            <Paper sx={{ p: 2 }}>
              {n.image && (
                <img
                  src={n.image}
                  alt="notice"
                  style={{
                    width: "100%",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              )}

              <Typography variant="h6" mt={1}>
                {n.title}
              </Typography>

              <Typography variant="body2">{n.message}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MemberDashboard;
