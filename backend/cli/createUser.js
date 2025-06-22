#!/usr/bin/env node
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const name = process.argv[2];
  const email = process.argv[3];
  const password = process.argv[4];

  if (!name || !email || !password) {
    console.log("❗ Usage: node cli/createUser.js <name> <email> <password>");
    return process.exit(1);
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("⚠️ User already exists.");
    return process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed });
  await user.save();
  console.log(`✅ User created: ${name} (${email})`);
  process.exit(0);
};

run();
