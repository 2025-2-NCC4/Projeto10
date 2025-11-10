// Em src/components/DayOfWeekChart.jsx
import React from 'react';
import styles from './DayOfWeekChart.module.css';
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

// Função para formatar o valor como Moeda (BRL)
const formatAsCurrency = (value) => {
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

// --- Função para processar os dados (Lógica do Notebook) ---
const processDataForChart = (data) => {
  const diasDaSemana = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 
    'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];
  
  // 1. Inicializa os contadores
  const dailyCounts = {
    'Segunda-feira': 0,
    'Terça-feira': 0,
    'Quarta-feira': 0,
    'Quinta-feira': 0,
    'Sexta-feira': 0,
    'Sábado': 0,
    'Domingo': 0,
  };

  // 2. Itera sobre os dados
  data.forEach(row => {
    // 3. Converte a data (ex: "01/10/2023") para um Objeto Date
    // (Precisamos tratar o formato DD/MM/YYYY)
    const dateParts = row.data.split('/');
    if (dateParts.length !== 3) return; // Pula data inválida
    
    // Formato: Ano, Mês (base 0), Dia
    const dateObj = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    
    // 4. Pega o dia da semana (0 = Domingo, 1 = Segunda, ...)
    const dayIndex = dateObj.getDay();
    const dayName = diasDaSemana[dayIndex];
    
    // 5. Converte o valor (ex: "15,50") para número
    const valor = parseFloat(row.valor_cupom.replace(',', '.'));
    
    if (dayName && !isNaN(valor)) {
      dailyCounts[dayName] += valor;
    }
  });

  // 6. Formata para o gráfico (na ordem correta)
  const chartData = diasDaSemana.map(day => ({
    name: day,
    total: parseFloat(dailyCounts[day].toFixed(2)),
  }));

  return chartData;
};

function DayOfWeekChart({ title, data }) {
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
          <YAxis tickFormatter={formatAsCurrency} />
          <Tooltip 
            formatter={(value) => [formatAsCurrency(value), "Receita"]}
            wrapperStyle={{ 
              backgroundColor: 'var(--color-background-card)', 
              color: 'var(--color-text-primary)' 
            }}
          />
          <Legend />
          <Bar dataKey="total" fill="#0088FE" name="Receita Bruta (R$)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DayOfWeekChart;