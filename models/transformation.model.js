import mongoose from "mongoose";

const TransformationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String },
    images: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Transformation", TransformationSchema);
