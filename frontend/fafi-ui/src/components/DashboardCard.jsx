import React from 'react';

function DashboardCard({ title, children, color = '#1e1e2f' }) {
  return (
    <div style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--border-radius)',
        padding: '1.5rem',
        marginBottom: '1rem',
        boxShadow: 'var(--shadow)',
        color: 'var(--text-light)'
      }}>
      
      {title && (
        <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>
          {title}
        </h3>
      )}
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

export default DashboardCard;
