import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Modal, Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import CreatePost from "./CreatePost";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/system";

const StyledAppBar = styled(AppBar)({
  background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.5)",
});

const StyledButton = styled(Button)({
  color: "#00f7ff",
  fontWeight: "bold",
  textTransform: "uppercase",
  "&:hover": {
    color: "#fff",
    background: "rgba(0, 255, 255, 0.2)",
    transition: "0.3s ease-in-out",
  },
});

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  backgroundColor: "#121212",
  boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.7)",
  borderRadius: "10px",
  padding: "20px",
  color: "#fff",
  animation: "fadeIn 0.3s ease-in-out",
});

const Navbar = ({ onPostCreated }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch {
        setToken(null);
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <HomeIcon fontSize="large" sx={{ color: "#00f7ff" }} />
          </IconButton>

          {token ? (
            <>
              <Typography variant="h6" sx={{ color: "#00f7ff", fontWeight: "bold" }}>
                Welcome, {username}
              </Typography>

              <IconButton onClick={() => setOpen(true)}>
                <AddCircleOutlineIcon fontSize="large" sx={{ color: "#00f7ff" }} />
              </IconButton>

              <Link to={`/profile/${username}`}>
                <IconButton>
                  <AccountCircleIcon fontSize="large" sx={{ color: "#00f7ff" }} />
                </IconButton>
              </Link>

              <IconButton onClick={handleLogout}>
                <LogoutIcon fontSize="large" sx={{ color: "#ff4d6d" }} />
              </IconButton>
            </>
          ) : (
            <>
              <StyledButton onClick={() => navigate("/login")}>Login</StyledButton>
              <StyledButton onClick={() => navigate("/signup")}>Signup</StyledButton>
            </>
          )}
        </Toolbar>
      </StyledAppBar>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalBox>
          <CreatePost
            onPostCreated={(post) => {
              onPostCreated(post);
              setOpen(false);
            }}
          />
        </ModalBox>
      </Modal>
    </>
  );
};

export default Navbar;
