import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Bar,
  Line,
  Pie,
  Doughnut,
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

type Props = {
  type: string;
  sqlQuery: string;
};

const WidgetChart: React.FC<Props> = ({ type, sqlQuery }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/query', { sql: sqlQuery });
        const result = response.data;

        if (result.length > 0) {
          const labels = Object.keys(result[0]);
          const values = result.map((row: any) => Object.values(row)[1]);

          setChartData({
            labels: result.map((row: any) => row[labels[0]]),
            datasets: [
              {
                label: 'Data',
                data: values,
                backgroundColor: [
                  '#ec4899cc',
                  '#10b981cc',
                  '#6366f1cc',
                  '#f59e0bcc',
                  '#06b6d4cc',
                ],
                borderColor: [
                  '#ec4899',
                  '#10b981',
                  '#6366f1',
                  '#f59e0b',
                  '#06b6d4',
                ],
                borderWidth: 1.5,
              },
            ],
          });
        }
      } catch (err) {
        console.error('Failed to fetch data for chart', err);
      }
    };

    fetchData();
  }, [sqlQuery]);

  const isDark = document.body.classList.contains('dark');
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#f4f4f4' : '#1a1a1a',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#f4f4f4' : '#1a1a1a',
        },
        grid: {
          color: isDark ? '#2a2a2a' : '#e5e7eb',
        },
      },
      y: {
        ticks: {
          color: isDark ? '#f4f4f4' : '#1a1a1a',
        },
        grid: {
          color: isDark ? '#2a2a2a' : '#e5e7eb',
        },
      },
    },
  };

  if (!chartData) return <p>Loading chart...</p>;

  switch (type.toLowerCase()) {
    case 'bar':
      return <Bar data={chartData} options={options} />;
    case 'line':
      return <Line data={chartData} options={options} />;
    case 'pie':
      return <Pie data={chartData} options={options} />;
    case 'doughnut':
      return <Doughnut data={chartData} options={options} />;
    default:
      return <p>Unsupported chart type</p>;
  }
};

export default WidgetChart;
