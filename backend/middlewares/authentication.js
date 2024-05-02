const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = await User.findById(tokenData.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = authenticateUser;
