import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (error) {
        console.error("❌ Invalid Token:", error);
        setToken(null);
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  const handleLogout = () => {
    console.log("🔹 Logging out...");
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
    window.location.reload(); // ✅ Ensures Navbar updates after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" onClick={() => navigate("/")}>Home</Button>

        {token ? (
          <>
            <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: "10px" }}>
              Welcome, {username}
            </Typography>
            <Link to={`/profile/${username}`} style={{ marginLeft: "10px" }}>
              <Button color="inherit">Profile</Button>
            </Link>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>Signup</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
