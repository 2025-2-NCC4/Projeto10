// Em src/components/StoreTypeChart.jsx
import React from 'react';
import styles from './StoreTypeChart.module.css';
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
  const storeTypeCounts = {};
  data.forEach(row => {
    const storeType = row.tipo_loja;
    if (!storeType) return;
    const cleanStoreType = storeType.trim().replace(/\s+/g, ' ');
    if (!storeTypeCounts[cleanStoreType]) {
      storeTypeCounts[cleanStoreType] = 0;
    }
    storeTypeCounts[cleanStoreType]++;
  });

  const chartData = Object.keys(storeTypeCounts).map(typeName => ({
    name: typeName,
    value: storeTypeCounts[typeName],
  })).sort((a, b) => b.value - a.value);

  // 1. CALCULAMOS O TOTAL AQUI
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  // 2. RETORNAMOS AMBOS
  return { chartData, totalValue };
};

// --- A paleta de cores continua a mesma ---
const COLORS = [
  '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d4b7eb', '#f95d6a', 
  '#ff7c43', '#ffa600', '#228B22', '#CD853F', '#8B008B', '#FFD700',
  '#6A5ACD', '#8B4513', '#4682B4', '#D2691E', '#708090', '#DC143C',
  '#FF4500', '#20B2AA'
];

// --- A legenda customizada continua a mesma ---
const CustomLegend = ({ data, colors, totalValue }) => {
  return (
    <ul className={styles.legendList}>
      {data.map((entry, index) => (
        <li key={`item-${index}`} className={styles.legendItem}>
          <span 
            className={styles.legendColorBox} 
            style={{ backgroundColor: colors[index % colors.length] }}
          ></span>
          {entry.name}: {entry.value} ({((entry.value / totalValue) * 100).toFixed(0)}%)
        </li>
      ))}
    </ul>
  );
};

// *** 3. NOSSO NOVO COMPONENTE: Tooltip Customizado ***
// Este componente recebe 'active' e 'payload' do recharts,
// e nós passamos o 'totalValue' manualmente.
const CustomTooltip = ({ active, payload, totalValue }) => {
  if (active && payload && payload.length && totalValue > 0) {
    const value = payload[0].value;
    const name = payload[0].name;
    const percent = ((value / totalValue) * 100).toFixed(0);
    const displayValue = `${value} (${percent}%)`;
    
    return (
      <div className={styles.customTooltip}>
        <p className={styles.tooltipLabel}>{`${name} : ${displayValue}`}</p>
      </div>
    );
  }
  return null;
};


function StoreTypeChart({ title, data }) {
  if (!data || data.length === 0) { 
    return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Sem dados para exibir.</p>
      </div>
    ); 
  }

  // 4. PEGAMOS OS DOIS VALORES
  const { chartData, totalValue } = processDataForChart(data);

  if (totalValue === 0) { 
    return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Dados encontrados, mas os valores são zero.</p>
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
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          {/* 5. USAMOS O TOOLTIP CUSTOMIZADO */}
          {/* Passamos o 'totalValue' como prop para o nosso componente */}
          <Tooltip 
            content={<CustomTooltip totalValue={totalValue} />} 
          />
          
          <Legend content={<CustomLegend data={chartData} colors={COLORS} totalValue={totalValue} />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StoreTypeChart;