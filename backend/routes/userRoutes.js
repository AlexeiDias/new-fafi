import express from 'express';
import { getUsers, createUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.delete('/:id', deleteUser);

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/avatars';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = req.body.name || 'user';
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });


router.post('/avatar-upload', upload.single('avatar'), async (req, res) => {
  try {
    const { name } = req.body;
    const avatarPath = `uploads/avatars/${req.file.filename}`;


    const user = await User.findOneAndUpdate(
      { name },
      { avatar: avatarPath },
      { new: true, upsert: true }
    );

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});


export default router;
