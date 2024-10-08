import express from "express";
import { createComment } from "../controller/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/comment", authMiddleware, createComment);

export default router;
