import { useState } from 'react';
import API from '../api/axios';

function AlertTrigger() {
  const [status, setStatus] = useState(null);

  const handleAlertSend = async () => {
    setStatus('sending');
    try {
      const res = await API.post('/alerts/send');
      setStatus(`✅ Sent ${res.data.sent} alerts`);
    } catch (err) {
      console.error('❌ Failed to send alerts:', err.message);
      setStatus('❌ Failed to send alerts');
    }
  };

  return (
    <div>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <span role="img">🔔 Alerts</span> Stats Overview
</h3>

     
      <button onClick={handleAlertSend}>Send Due Bill Alerts</button>
      {status && <p style={{ marginTop: '0.5rem' }}>{status}</p>}
    </div>
  );
}

export default AlertTrigger;
