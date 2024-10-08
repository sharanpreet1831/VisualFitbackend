import express from "express";
import authMiddleWare from "../middlewares/auth.middleware.js";
import { likePost } from "../controller/like.controller.js";
const router = express.Router();

router.post("/like", authMiddleWare, likePost);

export default router;
