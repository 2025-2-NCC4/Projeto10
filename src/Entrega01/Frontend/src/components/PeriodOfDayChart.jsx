// Em src/components/PeriodOfDayChart.jsx
import React from 'react';
import styles from './PeriodOfDayChart.module.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// --- Função para classificar os períodos (LÓGICA ATUALIZADA) ---
const getPeriodo = (hora) => {
  if (hora >= 6 && hora < 12) return 'Manhã';
  if (hora >= 12 && hora < 18) return 'Tarde';
  // Agora, "Noite" inclui a madrugada (18:00 - 05:59)
  if (hora >= 18 || hora < 6) return 'Noite'; 
  return 'Tarde'; // Failsafe, deve cair em Tarde (12-17)
};

// --- Função para processar os dados ---
const processDataForChart = (data) => {
  // 1. Inicializa os contadores (SEM "Madrugada")
  const periodoCounts = {
    'Manhã': 0,
    'Tarde': 0,
    'Noite': 0,
  };

  data.forEach(row => {
    const horaString = row.hora;
    if (!horaString) return;
    const hora = parseInt(horaString.split(':')[0], 10);
    if (isNaN(hora)) return;

    const periodo = getPeriodo(hora); // A nova lógica será aplicada
    const valor = parseFloat(row.valor_cupom.replace(',', '.'));
    
    if (periodo && !isNaN(valor)) {
      periodoCounts[periodo] += valor;
    }
  });

  // 6. Formata para o gráfico
  const chartData = Object.keys(periodoCounts).map(periodoName => ({
    name: periodoName,
    value: parseFloat(periodoCounts[periodoName].toFixed(2)),
  })).sort((a, b) => b.value - a.value);

  return chartData;
};

// Cores (Ajustadas para 3 categorias)
const COLORS = ['#FFBB28', '#00C49F', '#0088FE'];

function PeriodOfDayChart({ title, data }) {
  if (!data || data.length === 0) { /* ... (código 'sem dados') ... */ }

  const chartData = processDataForChart(data);
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
  if (totalValue === 0) { /* ... (código 'total 0') ... */ }

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
             formatter={(value) => [`R$ ${value.toLocaleString('pt-BR', {minimumFractionDigits: 2})}`, null]}
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

export default PeriodOfDayChart;