// Em src/components/FlowChart.jsx
import React from 'react';
import styles from './FlowChart.module.css';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

// --- A função processDataForChart continua a mesma ---
const processDataForChart = (data) => {
  const hourlyCounts = {}; 
  data.forEach(row => {
    const timeString = row.horario;
    if (!timeString) return; 
    const hour = timeString.split(':')[0];
    const hourString = String(hour).padStart(2, '0');
    if (!hourlyCounts[hourString]) {
      hourlyCounts[hourString] = 0;
    }
    hourlyCounts[hourString]++;
  });
  const chartData = Object.keys(hourlyCounts).map(hour => ({
    hora: `${hour}:00`,
    pedestres: hourlyCounts[hour],
  })).sort((a, b) => a.hora.localeCompare(b.hora));
  return chartData;
};


function FlowChart({ title, data }) {
  if (!data || data.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Sem dados para exibir.</p>
      </div>
    );
  }

  const chartData = processDataForChart(data);

  if (!chartData || chartData.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Não foi possível processar os dados. Verifique a coluna 'horario'.</p>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <h2>{title}</h2>
      
      {/* *** A CORREÇÃO ESTÁ AQUI ***
          Mudamos a altura de 300 para 400 */}
      <ResponsiveContainer width="100%" height={400}> 
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="pedestres" 
            stroke="#8884d8" 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FlowChart;