import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
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
    const { postId, text } = req.body;
    if (!postId || !text) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    const newComment = new Comment({
      userId: user._id,
      text: text,
      postId: post._id,
    });
    await newComment.save();
    await Post.findByIdAndUpdate(post._id, {
      $push: { comments: newComment._id },
    });
    return res.status(200).json({ success: true, comment: newComment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const fetchComments = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return res
        .status(400)
        .json({ success: false, message: "Post ID is required." });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const comments = await Comment.find({ postId: post._id }).populate(
      "userId",
      "username avatar"
    );
    return res.status(200).json({ success: true, comments: comments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
