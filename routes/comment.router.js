import express from "express";
import {
  createComment,
  fetchComments,
} from "../controller/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/comment", authMiddleware, createComment);
router.get("/allComments/:postId", fetchComments);

export default router;
