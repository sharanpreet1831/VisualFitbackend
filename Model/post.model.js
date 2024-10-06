import mongoose from "mongoose";
import { User } from "./user.model";

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

export const Post = mongoose.model("Post", PostSchema);
