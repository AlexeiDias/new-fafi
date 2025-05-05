import { useState } from 'react';
import API from '../api/axios';

function ImportExcelForm({ onImport }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setStatus('❌ Please choose a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await API.post('/import/transactions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus(`✅ Imported ${res.data.imported} transaction(s)`);
      onImport?.(); // refresh data if needed
      setFile(null);
    } catch (err) {
      console.error('❌ Import failed:', err);
      setStatus('❌ Import failed');
    }
  };

  return (
    <div>
      <h2>📥 Import Transactions from Excel</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default ImportExcelForm;
