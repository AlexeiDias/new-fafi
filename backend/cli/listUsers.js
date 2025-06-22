#!/usr/bin/env node
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find();
  console.log("👤 Registered Users:");
  users.forEach(user => {
    console.log(`- ${user.name} (${user.email})`);
  });
  process.exit(0);
};

run();
