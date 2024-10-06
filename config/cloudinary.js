import cloudinaryV2 from "cloudinary"; //! Cloudinary is being required
const cloudinary = cloudinaryV2.v2;
import dotenv from "dotenv";
dotenv.config();
const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (error) {
    console.log(error);
  }
};

export default cloudinaryConnect;
