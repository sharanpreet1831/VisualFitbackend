import mongoose from "mongoose";
import User from "./user.model.js";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    likeCount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
