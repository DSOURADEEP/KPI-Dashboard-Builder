import React from 'react';
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

type ChartRendererProps = {
  type: string;
  data: {
    labels: string[];
    values: number[];
  };
};

const getChartColors = (type: string, isDarkMode: boolean) => {
  const defaultColors = isDarkMode
    ? ['#f97316', '#84cc16', '#22d3ee', '#facc15', '#e879f9']
    : ['#ec4899', '#10b981', '#6366f1', '#f59e0b', '#06b6d4'];

  return {
    backgroundColor: defaultColors.map(c => `${c}88`), // slightly transparent
    borderColor: defaultColors,
  };
};

const ChartRenderer: React.FC<ChartRendererProps> = ({ type, data }) => {
  const isDarkMode = document.body.classList.contains('dark');

  const colors = getChartColors(type, isDarkMode);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Data',
        data: data.values,
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? '#f4f4f4' : '#1a1a1a',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? '#f4f4f4' : '#1a1a1a',
        },
        grid: {
          color: isDarkMode ? '#2a2a2a' : '#e5e7eb',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? '#f4f4f4' : '#1a1a1a',
        },
        grid: {
          color: isDarkMode ? '#2a2a2a' : '#e5e7eb',
        },
      },
    },
  };

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

export default ChartRenderer;
