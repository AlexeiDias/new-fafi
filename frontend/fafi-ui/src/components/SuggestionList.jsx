import { useEffect, useState } from 'react';
import API from '../api/axios';

function SuggestionList() {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    API.get('/suggestions')
      .then(res => setTips(res.data.suggestions))
      .catch(err => console.error('❌ Failed to load suggestions', err.message));
  }, []);

  if (tips.length === 0) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>💡 Suggestions</h3>
      <ul>
        {tips.map((s, i) => (
          <li key={i}>{s.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionList;
