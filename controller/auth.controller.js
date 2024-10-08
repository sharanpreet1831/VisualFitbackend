import User from "../models/user.model.js";
import validateEmail from "../utils/validateEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password length should be greater than 6",
      });
    }
    const user = await User.findOne({ email });
    const userWithUsername = await User.findOne({ username: username });
    if (user || userWithUsername) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err.toString());
    res.status(500).json({
      success: false,
      message:
        "Internal server error while signing up. Please Try again Later.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const user = validateEmail(email.toString())
      ? await User.findOne({ email: email })
      : await User.findOne({ username: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }
    user.password = null;
    const token = jwt.sign(user._doc, process.env.JWT_SECRET);
    res.status(200).json({
      success: true,
      token: token,
      message: "Logged in successfully.",
    });
  } catch (err) {
    console.log(err.toString());
    res.status(500).json({ success: false, message: "Internal server" });
  }
};
