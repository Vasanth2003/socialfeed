import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, Divider, Grid } from "@mui/material";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/profile/${username}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("❌ Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);
  

  if (loading) return <Typography align="center" color="primary">Loading profile...</Typography>;
  if (!user) return <Typography align="center" color="error">User not found.</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper
        sx={{
          p: 4,
          backgroundColor: "#121212",
          color: "#00eaff",
          textAlign: "center",
          borderRadius: 3,
          boxShadow: "0 0 15px rgba(0, 255, 255, 0.8)",
        }}
      >
        <Typography variant="h4" sx={{ textShadow: "0 0 10px #00eaff" }}>
          {user.username}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#00ff7f", textShadow: "0 0 5px #00ff7f" }}>
          {user.email}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: "#b3b3b3" }}>
          {user.bio || "No bio added yet."}
        </Typography>

        <Divider sx={{ my: 3, bgcolor: "#00eaff" }} />

        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ color: "#ff007f", textShadow: "0 0 5px #ff007f" }}>12</Typography>
            <Typography variant="body2">Posts</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ color: "#00ff7f", textShadow: "0 0 5px #00ff7f" }}>120</Typography>
            <Typography variant="body2">Followers</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ color: "#00eaff", textShadow: "0 0 5px #00eaff" }}>89</Typography>
            <Typography variant="body2">Following</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;
