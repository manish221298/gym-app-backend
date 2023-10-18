const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  let tokenData;
  try {
    tokenData = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = await User.findById(tokenData.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json(err.message)
    ;
  }

  if (!token) {
    return res.status(401).json("Not authorized, no token");
  }
};

module.exports = authenticateUser;
