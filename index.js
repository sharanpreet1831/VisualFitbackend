import express from "express";
// const dbconnect = require("./config/database");
const app = express();
import dotenv from "dotenv";
// load config from env file
dotenv.config();

const PORT = process.env.PORT || 5000;

// middle ware to parse json request body
app.use(express.json());

// import route for Todo api
import visualfitRouter from "./Routes/visualfit.js";
//mount the todo ASPI routes
app.use("/api/v1", visualfitRouter);

app.listen(PORT, () => {
  console.log(`server started succesfully at ${PORT}`);
});

//connect database
import dbconnect from "./config/database.js";
import fileUpload from "express-fileupload";
dbconnect();

// Use temp file directory
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Connect to Cloudinary cloud for uploading pictures
import cloudinaryConnect from "./config/cloudinary.js";
cloudinaryConnect();

app.get("/", (req, res) => {
  res.send(`<h1>This is Homepage  </h1>`);
});
