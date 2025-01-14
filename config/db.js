import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MongoDB URI:", process.env.MONGODB_URI);
    const connectInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log("mongo db is connect ", connectInstance.connection.host);
  } catch (error) {
    console.log("MONGODB Connection Error", error);
  }
};

export default connectDB;
