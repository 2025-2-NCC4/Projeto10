// Em src/components/GenderAdoptionChart.jsx
import React from 'react';
import styles from './GenderAdoptionChart.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell // 1. IMPORTAMOS O 'Cell'
} from 'recharts';

// --- Função para processar os dados (continua a mesma) ---
const processDataForChart = (data) => {
  const genderCounts = {}; 

  data.forEach(row => {
    const hasAppRaw = row.possui_app_picmoney;
    if (hasAppRaw) {
      const hasApp = hasAppRaw.trim().toLowerCase();
      if (hasApp === 'sim') {
        const gender = row.sexo;
        if (!gender) return; 
        const cleanGender = gender.trim();
        if (!genderCounts[cleanGender]) {
          genderCounts[cleanGender] = 0;
        }
        genderCounts[cleanGender]++;
      }
    }
  });

  const chartData = Object.keys(genderCounts).map(genderName => ({
    name: genderName,
    total: genderCounts[genderName],
  })).sort((a, b) => b.total - a.total); 

  return chartData;
};

// 2. DEFINIMOS AS CORES
const GENDER_COLORS = {
  'Masculino': '#3498db', // Azul
  'Feminino': '#E91E63',   // Rosa
  // Adicionamos cores 'backup' caso existam outros gêneros nos dados
  'Outro': '#B0B0B0',
  'N/D': '#B0B0B0',
};

function GenderAdoptionChart({ title, data }) {
  if (!data || data.length === 0) { /* ... (código de 'sem dados' continua o mesmo) ... */ }
  const chartData = processDataForChart(data);

  return (
    <div className={styles.chartContainer}>
      <h2>{title}</h2>
      {/* Ajustamos a altura para 400px para alinhar com o da esquerda */}
      <ResponsiveContainer width="100%" height={400}> 
        <BarChart 
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} usuários`, null]}
            wrapperStyle={{ 
              backgroundColor: 'var(--color-background-card)', 
              color: 'var(--color-text-primary)' 
            }}
          />
          <Legend />
          
          {/* 3. APLICAMOS AS CORES USANDO 'Cell' */}
          <Bar dataKey="total" name="Usuários com App">
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                // Usa a cor correspondente ao nome, ou a cor 'Outro'
                fill={GENDER_COLORS[entry.name] || GENDER_COLORS['Outro']} 
              />
            ))}
          </Bar>
          
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenderAdoptionChart;