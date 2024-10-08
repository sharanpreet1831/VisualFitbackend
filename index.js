import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import authRouter from "./routes/auth.router.js";
import postRouter from "./routes/post.router.js";
import dbconnect from "./config/database.js";
import cloudinaryConnect from "./config/cloudinary.js";
import likeRouter from "./routes/like.router.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
app.use("/api/v1", authRouter);
app.use("/api/v1/post", postRouter, likeRouter);
app.listen(PORT, () => {
  console.log(`server started successfully at ${PORT}`);
});
dbconnect();
cloudinaryConnect();
app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage </h1>`);
});
