import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🟢 MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};

export default connectDB;
