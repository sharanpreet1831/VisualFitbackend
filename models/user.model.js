import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    personalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalDetails",
    },
    setGoal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
    fitnessGoal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FitnessGoal",
    },
    isPersonalDetailsSet: {
      type: Boolean,
      default: false,
    },
    isGoalSet: {
      type: Boolean,
      default: false,
    },
    isFitnessGoalSet: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
