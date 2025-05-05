import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  role: {
    type: String,
    enum: ['admin', 'viewer'],
    default: 'viewer',
  }
});

const User = mongoose.model('User', userSchema);
export default User;
