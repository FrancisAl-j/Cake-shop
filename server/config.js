import mongoose from "mongoose";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGODB);
    console.log(`Connected to mongoDB`);
  } catch (error) {
    console.log("Failed to connect to mongoDB");
  }
};

export default connectDB;
