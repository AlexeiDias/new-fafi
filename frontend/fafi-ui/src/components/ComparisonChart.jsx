import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import API from '../api/axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ComparisonChart() {
  const [data, setData] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/compare?month=${month}&year=${year}`);
        setData(res.data);
      } catch (err) {
        console.error('❌ Chart data fetch failed:', err.message);
      }
    };

    fetchData();
  }, [month, year]);

  if (!data) return <p>Loading...</p>;

  const categories = Object.keys(data);
  const planned = categories.map(cat => data[cat].planned);
  const actual = categories.map(cat => data[cat].actual);

  const chartData = {
    labels: categories,
    datasets: [
        {
          label: 'Planned (Bills)',
          data: planned,
          backgroundColor: '#00d1ff'
        },
        {
          label: 'Actual (Transactions)',
          data: actual,
          backgroundColor: '#ff4d6d'
        }
      ]
      
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: { enabled: true },
    },
    scales: {
        y: {
          ticks: {
            color: '#fff'
          },
          grid: {
            color: '#333'
          }
        },
        x: {
          ticks: {
            color: '#fff'
          }
        }
      }
      
  };

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h3>📊 Bills vs Transactions</h3>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select value={month} onChange={e => setMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          style={{ width: '80px' }}
        />
      </div>

      <Bar
        key={JSON.stringify(chartData)} // ✅ fixes canvas reuse crash
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}

export default ComparisonChart;
