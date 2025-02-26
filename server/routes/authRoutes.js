const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post"); // ✅ Import Post model
const authenticateUser = require("../middleware/authMiddleware"); // ✅ Import middleware

require("dotenv").config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(username);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("❌ Signup Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔹 Login Request for:", email);

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Generated Token:", token);
    res.status(200).json({ token });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// router.get("/profile/:username", authenticateUser, async (req, res) => {
//   try {
//     console.log("🔹 Profile Request for:", req.params.username);
//     console.log("🔹 Decoded User from Token:", req.user); // ✅ Debugging

//     const { username } = req.params;
//     const user = await User.findOne({
//       where: { username },
//       attributes: ["id", "username", "email", "bio", "profilePicture"],
//     });

//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.status(200).json(user);
//   } catch (error) {
//     console.error("❌ Error fetching profile:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });





module.exports = router;
