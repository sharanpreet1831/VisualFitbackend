import cloudinaryV2 from "cloudinary";
const cloudinary = cloudinaryV2.v2;

// Image File uploader
const uploadImageToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

export default uploadImageToCloudinary;
