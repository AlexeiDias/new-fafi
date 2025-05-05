import { useState } from 'react';
import API from '../api/axios';

function AddTransactionForm({ onAdded, users }) {

  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    person: users?.[0] || '',

  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/transactions', form);
      setStatus('✅ Transaction added');
      setForm({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().slice(0, 10),
        person: 'Alex',
      });
      onAdded?.(); // Refresh list
    } catch (err) {
      setStatus('❌ Failed to add');
    }
  };

  return (
    <div>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <span role="img">➕ Add Transaction</span> Stats Overview
</h3>

     
      <form onSubmit={handleSubmit}>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input name="amount" value={form.amount} onChange={handleChange} type="number" placeholder="Amount" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="date" value={form.date} onChange={handleChange} type="date" />
        <select name="person" value={form.person} onChange={handleChange} required>
  <option value="">-- Select Person --</option>
  {users.map((u, i) => (
    <option key={i} value={u}>{u}</option>
  ))}
</select>

        <button type="submit">➕ Add</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default AddTransactionForm;
