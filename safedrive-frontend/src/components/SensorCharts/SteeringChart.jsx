import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import Card from '../common/Card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const SteeringChart = ({ data }) => {
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        label: 'Steering Variance',
        data: data,
        borderColor: '#45A29E',
        backgroundColor: 'rgba(69, 162, 158, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1F2833',
        titleColor: '#45A29E',
        bodyColor: '#C5C6C7'
      }
    },
    scales: {
      x: {
        grid: { color: '#1F2833' },
        ticks: { color: '#66666E' }
      },
      y: {
        grid: { color: '#1F2833' },
        ticks: { color: '#66666E' }
      }
    }
  };

  return (
    <Card title="⚡ Steering Stability">
      <div className="h-48">
        <Line data={chartData} options={options} />
      </div>
    </Card>
  );
};

export default SteeringChart;