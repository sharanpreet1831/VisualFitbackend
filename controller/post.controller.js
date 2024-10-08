import uploadImageToCloudinary from "../utils/imageUploader.js";
import Post from "../models/post.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();
export const createPost = async (req, res) => {
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
        .json({ success: false, message: "Unauthorized to Post" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken._id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to Post" });
    }
    const { title } = req.body;
    const picture = req.files?.postPicture;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const postImage = await uploadImageToCloudinary(
      picture,
      process.env.FOLDER_NAME
    );
    const newPost = new Post({
      userId: verifiedToken._id,
      title: title,
      image: postImage.secure_url,
    });
    await User.findByIdAndUpdate(user._id, {
      $push: { posts: newPost._id },
    });
    await newPost.save();
    return res.status(200).json({ success: true, post: newPost });
  } catch (err) {
    console.log(err);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("likes comments");
    return res.status(200).json({ success: true, posts: posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please refresh again.",
    });
  }
};

export const deletePost = async (req, res) => {
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
        .json({ success: false, message: "Unauthorized to delete post" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verifiedToken._id);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to delete post" });
    }
    const { postId } = req.body;
    if (!user.posts.includes(postId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this post. You do not own this post.",
      });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    await User.findByIdAndUpdate(user._id, {
      $pull: { posts: postId },
    });
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please retry after some time.",
    });
  }
};
