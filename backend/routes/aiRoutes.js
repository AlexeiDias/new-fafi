import express from 'express';
import Transaction from '../models/Transaction.js';
import Bill from '../models/Bill.js';
import ChatMessage from '../models/ChatMessage.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const { question, reset } = req.body;

  if (reset) {
    await ChatMessage.deleteMany({});
    return res.json({ answer: '🧠 Memory cleared from MongoDB!' });
  }

  try {
    const transactions = await Transaction.find().lean();
    const bills = await Bill.find().lean();
    const history = await ChatMessage.find().sort({ timestamp: 1 }).lean();

    const context = `
      You are a financial assistant helping users analyze their personal finance.
      Here are their transactions: ${JSON.stringify(transactions)}
      Here are their bills: ${JSON.stringify(bills)}
    `;

    const messages = [
      { role: 'system', content: context },
      ...history.map(({ role, content }) => ({ role, content })),
      { role: 'user', content: question }
    ];

    const chat = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const reply = chat.choices[0]?.message?.content || 'No response from AI';

    // Persist to DB
    await ChatMessage.create({ role: 'user', content: question });
    await ChatMessage.create({ role: 'assistant', content: reply });

    res.json({ answer: reply });
  } catch (err) {
    console.error('❌ AI Chat DB error:', err.message);
    res.status(500).json({ error: 'Chat DB failed' });
  }
});

// Optional: GET history endpoint
router.get('/history', async (req, res) => {
  const history = await ChatMessage.find().sort({ timestamp: 1 }).lean();
  res.json(history);
});

export default router;
