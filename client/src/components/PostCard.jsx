// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Button, TextField, CardMedia, Box, Divider } from "@mui/material";
import { likePost, commentOnPost } from "../api/api";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const PostCard = ({ post }) => {
  const { id, username = "Unknown", content = "", likes = 0, comments = "[]", image = null } = post;
  const [comment, setComment] = useState("");

  const [commentsList, setCommentsList] = useState(() => {
    try {
      return Array.isArray(comments) ? comments : JSON.parse(comments) || [];
    } catch (error) {
      console.error("Error parsing comments:", error);
      return [];
    }
  });

  const handleLike = async () => {
    try {
      await likePost(id, localStorage.getItem("token"));
      alert("Post liked!");
    } catch (error) {
      console.error("Failed to like post:", error);
      alert("Failed to like post");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return alert("Comment cannot be empty!");

    try {
      await commentOnPost(id, { username: "User", comment }, localStorage.getItem("token"));
      setCommentsList([...commentsList, { username: "User", comment, date: new Date().toLocaleString() }]);
      setComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
      alert("Failed to add comment");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "20px auto",
        borderRadius: 3,
        backgroundColor: "#121212",
        color: "#00eaff",
        boxShadow: "0 0 15px rgba(0, 255, 255, 0.8)",
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height="300"
          image={`${BASE_URL}${image}`}
          alt="Post"
          sx={{ borderBottom: "3px solid #00eaff" }}
        />
      )}
      <CardContent>
        <Typography variant="h6" sx={{ textShadow: "0 0 10px #00eaff", fontWeight: "bold" }}>
          {username}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "16px", color: "#b3b3b3", marginBottom: 1 }}>
          {content}
        </Typography>

        <Divider sx={{ my: 2, bgcolor: "#00eaff" }} />

        <Typography variant="body2" sx={{ color: "#00ff7f", textShadow: "0 0 5px #00ff7f" }}>
          Likes: {likes}
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            onClick={handleLike}
            variant="contained"
            sx={{
              backgroundColor: "#00ff7f",
              color: "#000",
              "&:hover": { backgroundColor: "#00eaff" },
            }}
          >
            👍 Like
          </Button>
        </Box>

        <Divider sx={{ my: 2, bgcolor: "#00eaff" }} />

        <Box mt={2}>
          <TextField
            label="Add a comment..."
            fullWidth
            variant="outlined"
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              input: { color: "#00eaff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#00eaff" },
                "&:hover fieldset": { borderColor: "#00ff7f" },
                "&.Mui-focused fieldset": { borderColor: "#ff007f" },
              },
            }}
          />
          <Button
            onClick={handleCommentSubmit}
            variant="contained"
            sx={{
              mt: 1,
              backgroundColor: "#ff007f",
              color: "#000",
              "&:hover": { backgroundColor: "#00eaff" },
            }}
          >
            💬 Comment
          </Button>
        </Box>

        {commentsList.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ textShadow: "0 0 5px #00eaff", fontWeight: "bold" }}>
              Comments:
            </Typography>
            {commentsList.map((c, index) => (
              <Typography key={index} variant="body2" sx={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
                <strong>{c.username}:</strong> {c.comment}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

// ✅ Add PropTypes
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string,
    content: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    image: PropTypes.string,
  }).isRequired,
};

export default PostCard;
