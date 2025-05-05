function Dashboard({ user, bills, transactions }) {
    const userTx = transactions.filter(t => t.person === user.name);
    const userBills = bills.filter(b => b.person === user.name);
  
    const income = userTx.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
    const expense = userTx.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
    const dueBills = userBills.filter(b => new Date(b.dueDate) <= new Date());
  
    return (
      <div>
        

        <h2 style={{
  display: 'flex',
  alignItems: 'center',
  fontSize: '1.75rem',
  fontWeight: 600,
  gap: '0.75rem',
  color: 'var(--text-light)'
}}>
  <span role="img">📊</span>
  {user.name}’s Dashboard
  {user.avatar && (
    <img
      src={`http://localhost:5000/${user.avatar.replace(/\\/g, '/')}`}
      alt="avatar"
      style={{
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover',
        boxShadow: '0 0 0 2px #fff'
      }}
    />
  )}
</h2>
        <p>💰 Income: ${income}</p>
        <p>💸 Expenses: ${expense}</p>
        <p>📅 Bills Due: {dueBills.length}</p>
      </div>
    );
  }
  