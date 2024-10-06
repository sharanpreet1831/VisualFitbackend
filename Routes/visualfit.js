import express from "express";
const router = express.Router();
import createuser from "../controller /createuser.js";

router.post("/createuser", createuser);

export default router;
