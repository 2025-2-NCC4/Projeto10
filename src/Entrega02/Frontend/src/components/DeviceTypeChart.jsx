// Em src/components/DeviceTypeChart.jsx
import React from 'react';
import styles from './DeviceTypeChart.module.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// --- Função para processar os dados ---
const processDataForChart = (data) => {
  const deviceCounts = {};

  data.forEach(row => {
    // 1. Usamos a coluna 'tipo_celular'
    const deviceType = row.tipo_celular;
    if (!deviceType) return; // Pula se estiver vazio

    const cleanDeviceType = deviceType.trim();

    if (!deviceCounts[cleanDeviceType]) {
      deviceCounts[cleanDeviceType] = 0;
    }
    deviceCounts[cleanDeviceType]++;
  });

  // 2. Formata para o gráfico
  const chartData = Object.keys(deviceCounts).map(name => ({
    name: name,
    value: deviceCounts[name],
  })).sort((a, b) => b.value - a.total); // Ordena

  return chartData;
};

// Cores (Verde para Android, Cinza para iOS, etc.)
const COLORS = ['#00C49F', '#B0B0B0', '#FFBB28', '#0088FE'];

function DeviceTypeChart({ title, data }) {
  if (!data || data.length === 0) { /* ... (código de 'sem dados') ... */ }

  const chartData = processDataForChart(data);
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
  
  if (totalValue === 0) {
     return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Não foi possível encontrar dados na coluna 'tipo_celular'.</p>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} (${((value / totalValue) * 100).toFixed(0)}%)`, name]}
            wrapperStyle={{ 
              backgroundColor: 'var(--color-background-card)', 
              color: 'var(--color-text-primary)' 
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DeviceTypeChart;