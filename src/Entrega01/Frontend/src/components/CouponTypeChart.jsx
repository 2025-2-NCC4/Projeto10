// Em src/components/CouponTypeChart.jsx
import React from 'react';
import styles from './CouponTypeChart.module.css';
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
  // 1. Inicializa os contadores
  const couponGroups = {};

  // 2. Itera sobre os dados
  data.forEach(row => {
    const tipo = row.tipo_cupom;
    const valorBruto = parseFloat(String(row.valor_cupom).replace(',', '.'));
    const repasse = parseFloat(String(row.repasse_picmoney).replace(',', '.'));

    // Pula linha se os dados estiverem inválidos
    if (!tipo || isNaN(valorBruto) || isNaN(repasse)) {
      return;
    }

    const valorLiquido = valorBruto - repasse;

    // 3. Agrupa os valores
    if (!couponGroups[tipo]) {
      couponGroups[tipo] = {
        receitaBruta: 0,
        receitaLiquida: 0,
      };
    }
    couponGroups[tipo].receitaBruta += valorBruto;
    couponGroups[tipo].receitaLiquida += valorLiquido;
  });

  // 6. Formata para o gráfico
  const chartData = Object.keys(couponGroups).map(name => ({
    name: name,
    "Receita Bruta": parseFloat(couponGroups[name].receitaBruta.toFixed(2)),
    "Receita Líquida": parseFloat(couponGroups[name].receitaLiquida.toFixed(2)),
  })).sort((a, b) => b["Receita Bruta"] - a["Receita Bruta"]); // Ordena

  return chartData;
};

function CouponTypeChart({ title, data }) {
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
            formatter={(value) => formatAsCurrency(value)}
            wrapperStyle={{ 
              backgroundColor: 'var(--color-background-card)', 
              color: 'var(--color-text-primary)' 
            }}
          />
          <Legend />
          <Bar dataKey="Receita Bruta" fill="#8884d8" />
          <Bar dataKey="Receita Líquida" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CouponTypeChart;