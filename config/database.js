import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbconnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("coonnnection build with database "))
    .catch((error) => {
      console.log("error occur ");
      console.log(error);
      process.exit(1);
    });
};

export default dbconnect;
