import User from "../models/user.model.js";
import validateEmail from "../utils/validateEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import PersonalDetails from "../models/personal_details.model.js";
import SetGoal from "../models/set_goal.model.js";
import FitnessGoal from "../models/fitness_goal.model.js";
dotenv.config();

export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Input validation
    if (!name || !username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid." });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password length should be greater than 6.",
      });
    }
    if (username.length < 3 || username.length > 15) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 3 and 15 characters.",
      });
    }

    // Check for existing users
    const user = await User.findOne({ email });
    const userWithUsername = await User.findOne({ username });
    if (user || userWithUsername) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      avatar: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });

    const goal = "";

    const newPersonalDetails = new PersonalDetails({ userId: newUser._id });
    const newSetGoal = new SetGoal({ userId: newUser._id });
    const newFitnessGoal = new FitnessGoal({ userId: newUser._id, goal });

    await Promise.all([
      newPersonalDetails.save(),
      newSetGoal.save(),
      newFitnessGoal.save(),
    ]);

    // Update user with related document IDs
    newUser.personalDetails = newPersonalDetails._id;
    newUser.setGoal = newSetGoal._id;
    newUser.fitnessGoal = newFitnessGoal._id;

    // Save the new user
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message:
        "Internal server error while signing up. Please try again later.",
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
      user: user._doc,
    });
  } catch (err) {
    console.log(err.toString());
    res.status(500).json({ success: false, message: "Internal server" });
  }
};
