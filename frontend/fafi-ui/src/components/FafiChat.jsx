import { useState } from 'react';
import API from '../api/axios';

function FafiChat() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await API.post('/ask', { question });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer('❌ AI failed to answer');
    }
    setLoading(false);
  };

  const resetMemory = async () => {
    await API.post('/ask', { reset: true });
    setAnswer('🧠 Memory cleared.');
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>🤖 Ask FAFI AI (with memory)</h3>
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="e.g. Who spent the most last week?"
        style={{ width: '60%' }}
      />
      <button onClick={ask}>💬 Ask</button>
      <button onClick={resetMemory} style={{ marginLeft: '1rem' }}>♻️ Reset Memory</button>

      {loading && <p>⌛ Thinking...</p>}
      {answer && <p style={{ marginTop: '1rem' }}>🧠 {answer}</p>}
    </div>
  );
}

export default FafiChat;
