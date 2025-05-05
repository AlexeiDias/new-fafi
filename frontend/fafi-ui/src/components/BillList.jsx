import { useState } from 'react';
import API from '../api/axios';

function BillList({ bills = [], onUpdate, user }) {
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState({});
  
    const startEdit = (bill) => {
      setEditId(bill._id);
      setForm(bill);
    };
  
    const cancelEdit = () => {
      setEditId(null);
      setForm({});
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    };
  
    const saveEdit = async () => {
      try {
        await API.put(`/bills/${editId}`, form);
        setEditId(null);
        onUpdate?.();
      } catch (err) {
        console.error('❌ Edit failed:', err.message);
      }
    };
  
    const deleteBill = async (id) => {
      if (!window.confirm('Delete this bill?')) return;
      try {
        await API.delete(`/bills/${id}`);
        onUpdate?.();
      } catch (err) {
        console.error('❌ Delete failed:', err.message);
      }
    };
  
    const filteredBills = bills.filter(bill => bill.person === user);
  
    return (
      <div>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <span role="img">📋 Upcoming Bills for {user}</span> Stats Overview
</h3>

      
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Amount</th><th>Due</th><th>Person</th><th>Category</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.map(bill => (
              <tr key={bill._id}>
                {editId === bill._id ? (
                  <>
                    <td><input name="name" value={form.name} onChange={handleChange} /></td>
                    <td><input name="amount" value={form.amount} onChange={handleChange} type="number" /></td>
                    <td><input name="dueDate" value={form.dueDate.slice(0, 10)} onChange={handleChange} type="date" /></td>
                    <td><input name="person" value={form.person} onChange={handleChange} /></td>
                    <td><input name="category" value={form.category} onChange={handleChange} /></td>
                    <td>
                      <button onClick={saveEdit}>💾</button>
                      <button onClick={cancelEdit}>✖️</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{bill.name}</td>
                    <td>${bill.amount}</td>
                    <td>{new Date(bill.dueDate).toLocaleDateString()}</td>
                    <td>{bill.person}</td>
                    <td>{bill.category}</td>
                    <td>
                      <button onClick={() => startEdit(bill)}>✏️</button>
                      <button onClick={() => deleteBill(bill._id)}>🗑️</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  

export default BillList;
