import { useEffect, useState } from 'react';
import API from '../api/axios';

function TransactionList({ user }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get('/transactions')
      .then(res => {
        const filtered = res.data.filter(tx => tx.person === user);
        setTransactions(filtered);
      })
      .catch(err => console.error('Error fetching transactions:', err));
  }, [user]);
  return (
    <div>
      <h2>💸 Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th><th>Amount</th><th>Category</th><th>Person</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td>{tx.type}</td>
              <td>${tx.amount}</td>
              <td>{tx.category}</td>
              <td>{tx.person}</td>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
