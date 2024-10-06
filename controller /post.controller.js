import uploadImageToCloudinary from "../utils/imageUploader.js";
import Post from "../Model/post.model.js";
import dotenv from "dotenv";
dotenv.config();
const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, name, description } = req.body;
    const picture = req.files?.postPicture;
    console.log(userId, name, description, picture);
    if (!userId || userId == "" || !name || name == "" || !description) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const postImage = await uploadImageToCloudinary(
      picture,
      process.env.FOLDER_NAME
    );
    console.log(postImage);
    console.log(postImage);
    const newPost = new Post({
      userId: userId,
      title: description,
      image: postImage.secure_url,
    });
    return res.status(200).json({ success: true, post: newPost });
  } catch (err) {
    console.log(err);
  }
};

export default createPost;
