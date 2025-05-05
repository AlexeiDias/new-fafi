import { useState } from 'react';
import API from '../api/axios';

function RunRecurringBillsButton({ onUpdate }) {
  const [status, setStatus] = useState('');

  const runRecurring = async () => {
    try {
      const res = await API.post('/bills/recurring-update');
      const count = res.data.updated;
      setStatus(`✅ Updated ${count} recurring bill(s)`);
      onUpdate?.(); // refresh bills
    } catch (err) {
      console.error('❌ Failed to update recurring bills:', err);
      setStatus('❌ Update failed');
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={runRecurring}>🔁 Run Recurring Bills</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default RunRecurringBillsButton;
