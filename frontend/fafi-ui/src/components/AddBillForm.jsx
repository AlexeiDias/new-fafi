import { useState } from 'react';
import API from '../api/axios';



function AddBillForm({ onBillAdded, users }) {

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    dueDate: '',
    category: '',
    person: '',
    email: '',
    phone: ''
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/bills', formData);
      setStatus('✅ Bill added!');
      setFormData({
        name: '',
        amount: '',
        dueDate: '',
        category: '',
        person: '',
        email: '',
        phone: ''
      });
      onBillAdded?.(res.data); // refresh parent if needed
    } catch (err) {
      console.error('❌ Failed to add bill:', err.message);
      setStatus('❌ Failed to add bill');
    }
  };

  return (
    <div>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <span role="img">➕ Add Bill</span> Stats Overview
</h3>

      
      <form onSubmit={handleSubmit}>
      <select name="person" value={formData.person} onChange={handleChange} required>
  <option value="">-- Select Person --</option>
  {users.map((u, i) => (
    <option key={i} value={u}>{u}</option>
  ))}
</select>

        <input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required type="number" />
        <input name="dueDate" value={formData.dueDate} onChange={handleChange} placeholder="Due Date" required type="date" />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        <input name="person" value={formData.person} onChange={handleChange} placeholder="Person" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email (optional)" />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" />
        <button type="submit">➕ Add Bill</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default AddBillForm;
