import jwt from "jsonwebtoken";
import PersonalDetails from "../models/personal_details.model.js";
import Goal from "../models/set_goal.model.js";
import User from "../models/user.model.js";
import FitnessGoal from "../models/fitness_goal.model.js";

export const updateUserPersonalDetails = async (req, res) => {
  try {
    let token;
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.body.token) {
      token = req.body.token;
    } else if (
      req.header("Authorization") &&
      req.header("Authorization").replace("Bearer ", "")
    ) {
      token = req.header("Authorization").replace("Bearer ", "");
    }
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to create comment" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken._id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to create comment" });
    }
    const { gender, height, weight } = req.body;
    if (!gender || !height || !weight) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    await PersonalDetails.findByIdAndUpdate(user.personalDetails, {
      gender: gender,
      height: height,
      weight: weight,
    });
    await User.findByIdAndUpdate(user._id, {
      isPersonalDetailsSet: true,
    });
    return res
      .status(200)
      .json({ success: true, message: "Details Saved Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const updateUserGoal = async (req, res) => {
  try {
    let token;
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.body.token) {
      token = req.body.token;
    } else if (
      req.header("Authorization") &&
      req.header("Authorization").replace("Bearer ", "")
    ) {
      token = req.header("Authorization").replace("Bearer ", "");
    }
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to create comment" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken._id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to create comment" });
    }
    const { days } = req.body;
    if (!days) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    await Goal.findByIdAndUpdate(user.setGoal, {
      days: days,
    });
    await User.findByIdAndUpdate(user._id, {
      isGoalSet: true,
    });
    return res
      .status(200)
      .json({ success: true, message: "Details Saved Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const updateFitnessGoal = async (req, res) => {
  try {
    let token;
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.body.token) {
      token = req.body.token;
    } else if (
      req.header("Authorization") &&
      req.header("Authorization").replace("Bearer ", "")
    ) {
      token = req.header("Authorization").replace("Bearer ", "");
    }
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to create comment" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken._id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to create comment" });
    }
    const { goal, goalPriority } = req.body;
    if (!goal || !goalPriority) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    await FitnessGoal.findByIdAndUpdate(user.fitnessGoal, {
      goal: goal,
      goalPriority: goalPriority,
    });
    await User.findByIdAndUpdate(user._id, {
      isFitnessGoalSet: true,
    });
    return res
      .status(200)
      .json({ success: true, message: "Details Saved Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
