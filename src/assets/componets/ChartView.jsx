import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { getRounds } from '../lib/db';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchRounds() {
      const rounds = await getRounds();
      const labels = rounds.map((_, i) => `Round ${i + 1}`);
      const sgTotals = rounds.map(r => r.totalSG || 0);

      setData({
        labels,
        datasets: [
          {
            label: 'Strokes Gained Total',
            data: sgTotals,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            tension: 0.3
          }
        ]
      });
    }

    fetchRounds();
  }, []);

  if (data.labels?.length === 0) return <p>No rounds to show yet.</p>;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Performance Over Time</h2>
      <Line data={data} />
    </div>
  );
}

