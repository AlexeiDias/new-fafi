// src/components/TogglePanel.jsx
import { useState } from 'react';

function TogglePanel({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, marginBottom: '1rem', padding: '1rem' }}>
      <button onClick={() => setOpen(!open)} style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
        {open ? `➖ Hide ${title}` : `➕ Show ${title}`}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export default TogglePanel;
