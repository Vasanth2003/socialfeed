const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔹 Auth Header:", authHeader); // Debugging  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("✅ Extracted Token:", token); // Debugging  

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ Invalid Token:", error.message);
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authenticateUser;
