import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.body && req.body.token) {
      token = req.body.token;
    } else if (
      req.header("Authorization") &&
      req.header("Authorization").replace("Bearer ", "")
    ) {
      token = req.header("Authorization").replace("Bearer ", "");
    }
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedToken;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default authMiddleware;
