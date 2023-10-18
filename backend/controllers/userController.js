const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userController = {};

userController.register = async (req, res) => {
  const { email, password } = req.body;
  let role = "";
  try {
    const user = await User.findOne({ email });
    const count = await User.find();
    if (count.length === 0) {
      role = "Admin";
    } else {
      role = "User";
    }

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const saltValue = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, saltValue);

    const newUser = new User({
      email,
      role,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(200).json({
      data: savedUser,
      message: "User Registered successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal servere error", error: err });
  }
};

userController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist", status: false });
    }

    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", status: false });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role,
      password: user.password,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .json({ message: "Logdin successfully", status: true, token: token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

module.exports = userController;
