// Em src/components/AdoptionChart.jsx
import React from 'react';
import styles from './AdoptionChart.module.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// --- Função para processar os dados (continua a mesma) ---
const processDataForChart = (data) => {
  const adoptionCounts = { 'Sim': 0, 'Não': 0 };

  data.forEach(row => {
    const hasAppRaw = row.possui_app_picmoney;
    if (!hasAppRaw) return; 
    const hasApp = hasAppRaw.trim().toLowerCase();
    
    if (hasApp === 'sim') {
      adoptionCounts['Sim']++;
    } else if (hasApp === 'não') {
      adoptionCounts['Não']++;
    }
  });

  const chartData = [
    { name: 'Possui o App', value: adoptionCounts['Sim'] },
    { name: 'Não Possui o App', value: adoptionCounts['Não'] },
  ];
  return chartData;
};

// Cores (Verde para Sim, Cinza para Não)
const COLORS = ['#00C49F', '#B0B0B0'];

function AdoptionChart({ title, data }) {
  if (!data || data.length === 0) { /* ... (código de 'sem dados' continua o mesmo) ... */ }
  const chartData = processDataForChart(data);
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
  if (totalValue === 0) { /* ... (código de 'total 0' continua o mesmo) ... */ }

  return (
    <div className={styles.chartContainer}>
      <h2>{title}</h2>

      {/* *** A CORREÇÃO ESTÁ AQUI ***
          Mudamos a altura de 300 para 400 para alinhar
      */}
      <ResponsiveContainer width="100%" height={400}> 
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120} 
            fill="#8884d8"
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip
            formatter={(value) => [`${value} pessoas`, null]}
            wrapperStyle={{ 
              minWidth: '130px', 
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              borderRadius: '3px'
            }}
          />
          
          <Legend verticalAlign="bottom" align="center" wrapperStyle={{ paddingBottom: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AdoptionChart;