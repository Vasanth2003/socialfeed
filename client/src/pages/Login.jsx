import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        window.location.href = "/";
      } else {
        alert("Login failed! No token received.");
      }
    } catch (error) {
      alert("Login failed! " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 3,
            textAlign: "center",
            background: "linear-gradient(135deg, #1e1e2e, #24243e)",
            color: "white",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            🔑 Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#6a5acd" },
                },
              }}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#6a5acd" },
                },
              }}
            />
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button type="submit" variant="contained" fullWidth sx={{ bgcolor: "#6a5acd", mt: 2 }}>
                Login
              </Button>
            </motion.div>
          </Box>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Login;
