import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return alert("Post cannot be empty!");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/api/posts`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setContent(""); 
      onPostCreated(response.data); 
    } catch (error) {
      console.error("❌ Error creating post:", error.response?.data || error);
      alert("Failed to create post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "20px auto", boxShadow: 3, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Create a New Post
        </Typography>
        <form onSubmit={handleCreatePost}>
          <TextField
            label="What's on your mind?"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
              {loading ? "Posting..." : "Post"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
