import mongoose from "mongoose";

const FitnessGoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: { type: String, default: "" },
    goalPriority: {
      type: Number,
      required: [true, "Goal Priority field is required"],
      default: 0,
      min: [0, "Minimum value for days is 0"],
      max: [3, "Maximum value for days is 3"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.FitnessGoal ||
  mongoose.model("FitnessGoal", FitnessGoalSchema);
