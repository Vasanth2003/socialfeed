const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/profile", profileRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => res.send("API is running..."));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await sequelize.sync();
});
