// Em src/pages/Dashboard.jsx
import React, { useState, useEffect, useMemo } from 'react';
import Card from '../components/Card';
import DataTable from '../components/DataTable';
import FlowChart from '../components/FlowChart';
import CategoryChart from '../components/CategoryChart';
import styles from './Dashboard.module.css';

const formatAsCurrency = (value) => {
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

function Dashboard() {
  // Estados
  const [playersData, setPlayersData] = useState([]);
  const [cuponsData, setCuponsData] = useState([]);
  const [lojasData, setLojasData] = useState([]);
  const [pedestresData, setPedestresData] = useState([]);
  const [loading, setLoading] = useState(true); // O 'loading' principal
  const [error, setError] = useState(null);

  // useEffect (fetch dos 4 dados)
  useEffect(() => {
    const fetchData = (url) => 
      fetch(url).then((res) => {
        if (!res.ok) {
          throw new Error(`Falha ao carregar dados de: ${url}`);
        }
        return res.json();
      });

    Promise.all([
      fetchData('http://localhost:3000/api/players'),
      fetchData('http://localhost:3000/api/cupons'),
      fetchData('http://localhost:3000/api/lojas'),
      fetchData('http://localhost:3000/api/pedestres'),
    ])
      .then(([players, cupons, lojas, pedestres]) => {
        setPlayersData(players);
        setCuponsData(cupons);
        setLojasData(lojas);
        setPedestresData(pedestres);
        setLoading(false); // SÓ PARA DE CARREGAR QUANDO TUDO CHEGAR
      })
      .catch((err) => {
        console.error('Erro ao buscar dados:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // useMemo (Cálculo dos KPIs)
  const kpis = useMemo(() => {
    if (cuponsData.length === 0) {
      return { receitaBrutaTotal: 0, ticketMedio: 0 };
    }
    const receitaBrutaTotal = cuponsData.reduce((sum, row) => {
      const valor = parseFloat(String(row.valor_cupom).replace(',', '.'));
      return sum + (isNaN(valor) ? 0 : valor);
    }, 0);
    const totalTransacoes = cuponsData.length;
    const ticketMedio = receitaBrutaTotal / totalTransacoes;
    return { receitaBrutaTotal, ticketMedio };
  }, [cuponsData]);

  // --- Lógica de Renderização (AGORA VAI FUNCIONAR!) ---

  if (loading) {
    return (
      <div className={styles.dashboardContent}>
        <h1>Visão Geral</h1>
        <p>Carregando KPIs principais...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.dashboardContent}>
        <h1>Visão Geral</h1>
        <p style={{ color: 'red' }}>Erro: {error}</p>
      </div>
    );
  }

  // --- Renderização de Sucesso ---
  return (
    <div className={styles.dashboardContent}>
      <h1>Visão Geral</h1>
      <p>Resumo dos principais KPIs (Indicadores-Chave de Performance) do projeto.</p>
      
      <div className={styles.kpiGrid}>
        <Card 
          title="Receita Bruta Total (Cupons)" 
          content={formatAsCurrency(kpis.receitaBrutaTotal)} 
        />
        <Card 
          title="Ticket Médio (Cupons)" 
          content={formatAsCurrency(kpis.ticketMedio)} 
        />
        <Card 
          title="Total de Players Cadastrados" 
          content={`${playersData.length} players`} 
        />
        <Card 
          title="Total de Pedestres (Av. Paulista)" 
          content={`${pedestresData.length} registros`} 
        />
      </div>

      <div className={styles.chartGrid}>
        <FlowChart 
          title="Fluxo de Pedestres por Hora"
          data={pedestresData}
        />
        <CategoryChart 
          title="Top 10 Categorias de Cupons (por Vol.)"
          data={cuponsData}
        />
      </div>
      <DataTable
        title="Últimos Players Cadastrados (Amostra)"
        data={playersData.slice(0, 10)} 
      />
    </div>
  );
}

export default Dashboard;