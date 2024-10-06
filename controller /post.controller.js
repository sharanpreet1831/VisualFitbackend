const { Post } = require("../Model/post.model");
require("dotenv").config();
exports.createPost = async (req, res) => {
  try {
    const { userId, name, description } = req.body;
    const postPicture = req.files.postPicture;
    if (
      !userId ||
      userId == "" ||
      !name ||
      name == "" ||
      !description ||
      !postPicture ||
      postPicture == ""
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }
    const newPost = new Post({
      userId: userId,
      title: description,
      image: "",
    });
  } catch (err) {}
};
