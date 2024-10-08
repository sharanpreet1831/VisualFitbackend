import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "../controller/post.controller.js";
import authMiddleWare from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/createPost", authMiddleWare, createPost);
router.get("/getPosts", getAllPosts);
router.delete("/deletePost", authMiddleWare, deletePost);

export default router;
