function ExportButtons() {
    const handleExport = (type) => {
      const url = `/api/export/${type}`;
      window.open(url, '_blank');
    };
  
    return (
      <div>
        <h2>📤 Export Data</h2>
        <button onClick={() => handleExport('pdf')}>📄 Export PDF</button>
        <button onClick={() => handleExport('xlsx')}>📊 Export Excel</button>
      </div>
    );
  }
  
  export default ExportButtons;
  