import express from "express";
import {
  updateFitnessGoal,
  updateUserGoal,
  updateUserPersonalDetails,
} from "../controller/user.controller.js";
import authMiddleWare from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/updatePersonalDetails",
  authMiddleWare,
  updateUserPersonalDetails
);

router.post("/updateGoalDetails", authMiddleWare, updateUserGoal);

router.post("/updateFitnessGoalDetails", authMiddleWare, updateFitnessGoal);

export default router;
