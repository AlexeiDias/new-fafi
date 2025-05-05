import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const users = await User.find();
console.log('📋 All users:', users);
process.exit();
