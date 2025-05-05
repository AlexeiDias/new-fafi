import { useState, useEffect } from 'react';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import TopBar from './components/TopBar.jsx';
import StatSummary from './components/StatSummary.jsx';
import AddTransactionForm from './components/AddTransactionForm.jsx';
import AddBillForm from './components/AddBillForm.jsx';
import ImportExcelForm from './components/ImportExcelForm.jsx';
import BillList from './components/BillList.jsx';
import TransactionList from './components/TransactionList.jsx';
import RunRecurringBillsButton from './components/RunRecurringBillsButton.jsx';
import UserManager from './components/UserManager.jsx';
import CalendarView from './components/CalendarView.jsx';
import SuggestionList from './components/SuggestionList.jsx';
import ComparisonChart from './components/ComparisonChart.jsx';
import DashboardCard from './components/DashboardCard.jsx';
import TogglePanel from './components/TogglePanel.jsx';
import API from './api/axios.js';
import './styles/Dashboard.css';

function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState('login');
  const [currentUser, setCurrentUser] = useState('Alex');
  const [bills, setBills] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [availableUsers, setAvailableUsers] = useState(['Alexei', 'Tais']);
  const [activeTool, setActiveTool] = useState(null);

  const fetchData = async () => {
    try {
      const billsRes = await API.get('/bills');
      const txRes = await API.get('/transactions');
      setBills(billsRes.data);
      setTransactions(txRes.data);
    } catch (err) {
      console.error('❌ Fetch failed:', err.message);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="login-container" style={{ padding: '2rem' }}>
        {mode === 'login' ? (
          <Login onLogin={setUser} switchMode={() => setMode('register')} />
        ) : (
          <Register onSuccess={setUser} switchMode={() => setMode('login')} />
        )}
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper" style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-light)' }}>
      <TopBar
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
      />

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <DashboardCard title="💰 All Bills">
            <BillList bills={bills} user={currentUser} onUpdate={fetchData} />
          </DashboardCard>
        </div>

        <div className="dashboard-card">
          <DashboardCard title="📄 All Transactions">
            <TransactionList transactions={transactions} user={currentUser} />
          </DashboardCard>
        </div>
      </div>

      <div className="dashboard-subgrid">
        <div className="dashboard-card">
          <DashboardCard title="📈 Stats Overview">
            <StatSummary user={currentUser} transactions={transactions} />
          </DashboardCard>
        </div>
        <div className="dashboard-card">
          <DashboardCard title="💡 Smart Suggestions">
            <SuggestionList />
          </DashboardCard>
        </div>
        <div className="dashboard-card">
          <DashboardCard title="📊 Bills vs Transactions">
            <ComparisonChart />
          </DashboardCard>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <DashboardCard title="🗓️ Bill Calendar">
            <CalendarView user={currentUser} />
          </DashboardCard>
        </div>
      </div>

      {/* 🧩 Toggle Panels */}
      {activeTool === 'transaction' && (
        <TogglePanel title="Add Transaction">
          <AddTransactionForm onAdded={fetchData} users={availableUsers} />
        </TogglePanel>
      )}

      {activeTool === 'bill' && (
        <TogglePanel title="Add Bill">
          <AddBillForm onBillAdded={fetchData} users={availableUsers} />
        </TogglePanel>
      )}

      {activeTool === 'import' && (
        <TogglePanel title="Import Excel">
          <ImportExcelForm onImport={fetchData} />
        </TogglePanel>
      )}

      {activeTool === 'users' && (
        <TogglePanel title="Manage Users">
          <UserManager onChange={setAvailableUsers} />
        </TogglePanel>
      )}

      {activeTool && (
        <button
          onClick={() => setActiveTool(null)}
          style={{
            backgroundColor: '#e74c3c',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          ❌ Close Tool
        </button>
      )}
    </div>
  );
}

export default App;
