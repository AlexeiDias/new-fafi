import { useEffect, useState } from 'react';
import API from '../api/axios';

function StatSummary() {
  const [stats, setStats] = useState({ income: 0, expenses: 0, balance: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/stats/summary')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>📊 Loading summary...</p>;

  return (
    <div>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <span role="img">📈 Monthly Summary</span> Stats Overview
</h3>

      
      <ul>
        <li><strong>💰 Income:</strong> ${stats.income.toFixed(2)}</li>
        <li><strong>🧾 Expenses:</strong> ${stats.expenses.toFixed(2)}</li>
        <li><strong>🟢 Balance:</strong> ${stats.balance.toFixed(2)}</li>
      </ul>
    </div>
  );
}

export default StatSummary;
