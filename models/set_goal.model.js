import mongoose from "mongoose";

const SetGoalModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    days: {
      type: Number,
      required: [true, "Days field is required"],
      default: 2,
      min: [2, "Minimum value for days is 2"],
      max: [7, "Maximum value for days is 7"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Goal || mongoose.model("Goal", SetGoalModel);
