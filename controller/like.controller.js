import Like from "../models/like.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Post from "../models/post.model.js";
dotenv.config();

export const likePost = async (req, res) => {
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
    const { postId } = req.body;
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found." });
    }
    const userId = verifiedToken._id;
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      await Promise.all([
        Post.findByIdAndUpdate(postId, { $pull: { likes: existingLike._id } }),
        Like.findByIdAndDelete(existingLike._id),
      ]);
      return res
        .status(200)
        .json({ success: true, message: "Post unliked successfully." });
    } else {
      const newLike = new Like({ postId, userId });
      await newLike.save();

      await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });
      return res
        .status(200)
        .json({ success: true, message: "Post liked successfully." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message:
        "Internal server error while liking the post. Please try again later.",
    });
  }
};
