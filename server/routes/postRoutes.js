const express = require("express");
const Post = require("../models/Post");
const upload = require("../middleware/upload");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/create", authenticateUser, upload.single("image"), async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!content) return res.status(400).json({ error: "Content is required!" });

    const post = await Post.create({ username: req.user.username, content, image });
    res.status(201).json({ message: "Post created successfully!", post });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

  
  router.get("/all", async (req, res) => {
    try {
      const { sort, user } = req.query;
  
      let queryOptions = {
        order: [["createdAt", "DESC"]],
      };
  
      if (sort === "likes") {
        queryOptions.order = [["likes", "DESC"]];
      } else if (sort === "oldest") {
        queryOptions.order = [["createdAt", "ASC"]];
      }
  
      if (user) {
        queryOptions.where = { username: user };
      }
  
      const posts = await Post.findAll(queryOptions);
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });


  router.post("/", authenticateUser, async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) return res.status(400).json({ error: "Post content is required" });
  
      const newPost = await Post.create({
        userId: req.user.id,
        username: req.user.username,
        content,
      });
  
      res.status(201).json(newPost);
    } catch (error) {
      console.error("❌ Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


router.post("/like/:id", async (req, res) => {
    try {
        
      const post = await Post.findByPk(req.params.id);
      console.log(post);
      
      if (!post) return res.status(404).json({ error: "Post not found" });

      post.likes += 1;
      await post.save();
  
      res.status(200).json({ message: "Post liked!", post });
    }  catch (error) {
        console.error("❌ Like Post Error:", error);
        res.status(500).json({ error: error.message });
      }
  });

  router.post("/comment/:id", async (req, res) => {
    try {
      const { username, comment } = req.body;
      const post = await Post.findByPk(req.params.id);
  
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      let existingComments = [];
      if (post.comments && post.comments !== "null") {
        try {
          existingComments = JSON.parse(post.comments);
        } catch (err) {
          existingComments = [];
        }
      }
  
      existingComments.push({ username, comment, date: new Date() });
      post.comments = JSON.stringify(existingComments);
      await post.save();
  
      res.status(200).json({ message: "Comment added!", post });
    } catch (error) {
      console.error("❌ Error adding comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  
  


  router.get("/comments/:id", async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      const comments = post.comments ? JSON.parse(post.comments) : [];
      res.status(200).json(comments);
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


  router.delete("/comment/:postId/:commentIndex", async (req, res) => {
    try {
      const { postId, commentIndex } = req.params;
      const post = await Post.findByPk(postId);
  
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      let comments = post.comments ? JSON.parse(post.comments) : [];
  
      if (commentIndex < 0 || commentIndex >= comments.length) {
        return res.status(400).json({ error: "Invalid comment index" });
      }
  
      comments.splice(commentIndex, 1); 
  
      post.comments = JSON.stringify(comments);
      await post.save();
  
      res.status(200).json({ message: "Comment deleted successfully!", post });
    } catch (error) {
      console.error("❌ Error deleting comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


  router.put("/comment/:postId/:commentIndex", async (req, res) => {
    try {
      const { postId, commentIndex } = req.params;
      const { newComment } = req.body;
      const post = await Post.findByPk(postId);
  
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      let comments = post.comments ? JSON.parse(post.comments) : [];
  
      if (commentIndex < 0 || commentIndex >= comments.length) {
        return res.status(400).json({ error: "Invalid comment index" });
      }
  
      comments[commentIndex].comment = newComment;
      comments[commentIndex].date = new Date(); 
  
      post.comments = JSON.stringify(comments);
      await post.save();
  
      res.status(200).json({ message: "Comment updated successfully!", post });
    } catch (error) {
      console.error("❌ Error updating comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  


  router.delete("/delete/:id", authenticateUser, async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
  
      if (!post) return res.status(404).json({ error: "Post not found" });
  
      console.log("🔍 Logged-in User:", req.user.username);
      console.log("📝 Post Creator:", post.username);
  
      if (req.user.username !== post.username) {
        return res.status(403).json({ error: "Unauthorized to delete this post" });
      }
  
      await post.destroy();
  
      res.status(200).json({ message: "Post deleted successfully!" });
    } catch (error) {
      console.error("❌ Error deleting post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  router.get("/all", async (req, res) => {
    try {
      const { sort, user } = req.query;
  
      let queryOptions = {
        order: [["createdAt", "DESC"]], // Default: Newest first
      };
  
      if (sort === "likes") {
        queryOptions.order = [["likes", "DESC"]];
      } else if (sort === "oldest") {
        queryOptions.order = [["createdAt", "ASC"]];
      }
  
      if (user) {
        queryOptions.where = { username: user };
      }
  
      const posts = await Post.findAll(queryOptions);
      res.status(200).json(posts);
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  

  router.get("/user/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const posts = await Post.findAll({
        where: { username },
        order: [["createdAt", "DESC"]],
      });
  
      if (!posts.length) return res.status(404).json({ error: "No posts found for this user" });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error("❌ Error fetching user posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  

module.exports = router;
