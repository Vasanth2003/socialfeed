import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Modal, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";

const Navbar = ({ onPostCreated }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false); // Modal state

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
    <>
      <AppBar position="static">
        <Toolbar>
          {/* ✅ Home Button: Navigates to Home */}
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>

          {token ? (
            <>
              <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: "10px" }}>
                Welcome, {username}
              </Typography>

              {/* ✅ Create Post Button */}
              <Button color="inherit" onClick={() => setOpen(true)}>➕ Create Post</Button>

              {/* ✅ Profile Button */}
              <Link to={`/profile/${username}`} style={{ marginLeft: "10px" }}>
                <Button color="inherit">Profile</Button>
              </Link>

              {/* ✅ Logout Button */}
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

      {/* ✅ Create Post Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <CreatePost onPostCreated={(post) => {
            onPostCreated(post);
            setOpen(false);
          }} />
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
