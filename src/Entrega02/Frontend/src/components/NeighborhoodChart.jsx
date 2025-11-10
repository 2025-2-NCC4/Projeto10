// Em src/components/NeighborhoodChart.jsx
import React from 'react';
import styles from './NeighborhoodChart.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Funções de formatação (continuam as mesmas)
const formatAsCurrency = (value) => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  }
  return `R$ ${value.toLocaleString('pt-BR')}`;
};
const formatTooltipCurrency = (value) => {
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// 1. O componente agora recebe 'data' como prop
function NeighborhoodChart({ title, data }) {
  
  // 2. Removemos toda a lógica de fetch, useState, useEffect, loading e error

  // 3. Adicionamos uma verificação de 'data'
  if (!data || data.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Sem dados de bairro para exibir.</p>
      </div>
    );
  }

  // 4. Pegamos os Top 15 dados *recebidos*
  const chartData = data.slice(0, 15);

  return (
    <div className={styles.chartContainer}>
      <h2>{title}</h2>
      
      <ResponsiveContainer width="100%" height={700}> 
        <BarChart 
          data={chartData} 
          layout="vertical"
          margin={{ top: 5, right: 30, left: 150, bottom: 5 }} 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            type="number" 
            tickFormatter={formatAsCurrency}
          />
          <YAxis 
            dataKey="name" 
            type="category"
            interval={0}
          />
          <Tooltip 
            formatter={(value) => [formatTooltipCurrency(value), "Total em Cupons"]}
            wrapperStyle={{ 
              backgroundColor: 'var(--color-background-card)', 
              color: 'var(--color-text-primary)' 
            }}
          />
          <Legend />
          <Bar dataKey="total" fill="#FF8042" name="Valor Total (R$)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NeighborhoodChart;