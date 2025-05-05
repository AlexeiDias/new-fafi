// src/components/TopBar.jsx
import React, { useState } from 'react';

function TopBar({ currentUser, activeTool, setActiveTool, onAIQuery }) {
  const [prompt, setPrompt] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && prompt.trim()) {
      onAIQuery(prompt);
      setPrompt('');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      backgroundColor: '#2c2e3e',
      color: '#f0f0f0',
      borderBottom: '1px solid #444',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      gap: '1rem'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
        📊 FAFI
      </div>

      {/* 🧠 AI Textbox */}
      <input
        type="text"
        placeholder="Ask AI anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          flexGrow: 1,
          padding: '0.6rem 1rem',
          borderRadius: '8px',
          border: 'none',
          backgroundColor: '#444',
          color: '#f0f0f0',
          fontSize: '1rem'
        }}
      />

      {/* Tool Selector */}
      <select
        value={activeTool || ''}
        onChange={(e) => setActiveTool(e.target.value)}
        style={{
          padding: '0.5rem',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#444',
          color: '#f0f0f0'
        }}
      >
        <option value="">🛠️ Tool</option>
        <option value="transaction">➕ Add Transaction</option>
        <option value="bill">➕ Add Bill</option>
        <option value="import">📥 Import Excel</option>
        <option value="users">👥 Manage Users</option>
      </select>

      {/* Current User */}
      <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>
        👤 {currentUser}
      </div>
    </div>
  );
}

export default TopBar;
