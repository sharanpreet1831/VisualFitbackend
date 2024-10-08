import express from "express";
import { signUp, login } from "../controller/auth.controller.js";
const router = express.Router();

router.post("/sign-in", login);
router.post("/sign-up", signUp);

export default router;
