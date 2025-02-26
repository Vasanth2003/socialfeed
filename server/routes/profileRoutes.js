const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// ✅ Ensure the route is correctly defined as `/api/profile/:username`
router.get("/:username", authenticateUser, async (req, res) => {
  try {
    console.log("Here");
    
    console.log("🔹 Fetching profile for:", req.params.username);
    console.log("🔹 Decoded User from Token:", req.user);

    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
      attributes: ["id", "username", "email", "bio", "profilePicture"],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
