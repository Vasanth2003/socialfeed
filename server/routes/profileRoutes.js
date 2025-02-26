const express = require("express");
const authenticateUser = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

router.get("/:username", authenticateUser, async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      where: { username },
      attributes: ["id", "username", "email", "bio", "profilePicture"],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
