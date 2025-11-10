// Em src/components/AgeAdoptionChart.jsx
import React from 'react';
import styles from './AgeAdoptionChart.module.css';
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

// --- Função para agrupar por idade (continua a mesma) ---
const getAgeGroup = (age) => {
  const ageNum = parseInt(age, 10);
  if (isNaN(ageNum)) return 'N/D'; // Não disponível
  
  if (ageNum <= 17) return 'Menor de 18';
  if (ageNum <= 25) return '18-25';
  if (ageNum <= 35) return '26-35';
  if (ageNum <= 45) return '36-45';
  if (ageNum <= 55) return '46-55';
  if (ageNum > 55) return '56+';
  return 'N/D';
};

// --- Função para processar os dados ---
const processDataForChart = (data) => {
  // 1. Inicializa os contadores
  const ageAdoptionCounts = {
    'Menor de 18': 0,
    '18-25': 0,
    '26-35': 0,
    '36-45': 0,
    '46-55': 0,
    '56+': 0,
    'N/D': 0,
  };

  // 2. Itera sobre os dados
  data.forEach(row => {
    // 3. Verifica se a pessoa TEM o app
    const hasAppRaw = row.possui_app_picmoney;
    if (hasAppRaw) {
      const hasApp = hasAppRaw.trim().toLowerCase();
      if (hasApp === 'sim') {
        // 4. Se tiver, descobre a faixa etária
        const ageGroup = getAgeGroup(row.idade);
        // 5. Incrementa o contador
        if (ageAdoptionCounts.hasOwnProperty(ageGroup)) {
          ageAdoptionCounts[ageGroup]++;
        }
      }
    }
  });

  // 6. Formata para o gráfico
  const chartData = Object.keys(ageAdoptionCounts).map(groupName => ({
    name: groupName,
    total: ageAdoptionCounts[groupName],
  }))
  // *** A CORREÇÃO ESTÁ AQUI ***
  // Filtra o item "N/D" antes de retornar
  .filter(item => item.name !== 'N/D');

  return chartData;
};

function AgeAdoptionChart({ title, data }) {
  if (!data || data.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Sem dados para exibir.</p>
      </div>
    );
  }

  const chartData = processDataForChart(data);

  return (
    <div className={styles.chartContainer}>
      <h2>{title}</h2>
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
          <Bar dataKey="total" fill="#8884d8" name="Usuários com App" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AgeAdoptionChart;