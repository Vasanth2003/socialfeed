// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types"; 
import { Card, CardContent, Typography, Button, TextField, CardMedia, Box } from "@mui/material";
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
    <Card sx={{ maxWidth: 500, margin: "20px auto", boxShadow: 3, borderRadius: 3 }}>
      {image && <CardMedia component="img" height="250" image={`${BASE_URL}${image}`} alt="Post" />}
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976D2" }}>
          {username}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "16px", marginBottom: 1 }}>
          {content}
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          Likes: {likes}
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button onClick={handleLike} variant="contained" color="primary" size="small">
            👍 Like
          </Button>
        </Box>

        <Box mt={2}>
          <TextField
            label="Add a comment..."
            fullWidth
            variant="outlined"
            size="small"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={handleCommentSubmit} variant="contained" color="secondary" sx={{ marginTop: 1 }}>
            💬 Comment
          </Button>
        </Box>

        {commentsList.length > 0 && (
          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
