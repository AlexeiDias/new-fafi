#!/usr/bin/env node
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = process.argv[2];
  const newPass = process.argv[3];
  const user = await User.findOne({ email });
  if (!user) return console.log("❌ User not found"), process.exit(0);

  user.password = await bcrypt.hash(newPass, 10);
  await user.save();
  console.log(`✅ Password updated for ${email}`);
  process.exit(0);
};

run();
