// Em src/pages/PaginaCEO.jsx
import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import CategoryChart from '../components/CategoryChart';
import StoreTypeChart from '../components/StoreTypeChart';
import NeighborhoodChart from '../components/NeighborhoodChart';
import DayOfWeekChart from '../components/DayOfWeekChart';
import PeriodOfDayChart from '../components/PeriodOfDayChart';
import styles from './Dashboard.module.css'; 

function PaginaCEO() {
  // --- A lógica de Fetch (buscando 4 APIs) continua a mesma ---
  const [playersData, setPlayersData] = useState([]);
  const [cuponsData, setCuponsData] = useState([]);
  const [lojasData, setLojasData] = useState([]);
  const [neighborhoodData, setNeighborhoodData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      fetchData('http://localhost:3000/api/valor-por-bairro'),
    ])
      .then(([players, cupons, lojas, bairros]) => {
        setPlayersData(players);
        setCuponsData(cupons);
        setLojasData(lojas);
        setNeighborhoodData(bairros);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar dados do CEO:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // --- *** CORREÇÃO DO LOADING SCREEN *** ---
  // (Estes blocos agora estão preenchidos)
  if (loading) {
    return (
      <div className={styles.dashboardContent}>
        <h1>Visão do CEO</h1>
        <p>Carregando dados financeiros e de clientes...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.dashboardContent}>
        <h1>Visão do CEO</h1>
        <p style={{ color: 'red' }}>Erro: {error}</p>
      </div>
    );
  }

  // --- Renderização de Sucesso ---
  return (
    <div className={styles.dashboardContent}>
      <h1>Visão do CEO</h1>
      <p>Foco em aquisição de clientes, performance de cupons e receita regional.</p>

      {/* Grid 1: Foco em "O Quê" (Categorias e Lojas) */}
      <div className={styles.chartGrid}>
        <CategoryChart
          title="Top 10 Categorias de Cupons"
          data={cuponsData}
        />
        <StoreTypeChart
          title="Distribuição por Tipo de Loja"
          data={lojasData}
        />
      </div>

      {/* Grid 2: Foco em "Quando" (Tempo) */}
      <div className={styles.chartGrid}>
        <DayOfWeekChart
          title="Receita Bruta por Dia da Semana"
          data={cuponsData}
        />
        <PeriodOfDayChart
          title="Receita Bruta por Período do Dia"
          data={cuponsData}
        />
      </div>
      
      {/* Gráfico de Bairros (continua aqui) */}
      <NeighborhoodChart 
        title="Receita por Bairro (Top 15)"
        data={neighborhoodData}
      />

      {/* Tabela de Players (continua aqui) */}
      <DataTable
        title="Novos Players Cadastrados (Amostra)"
        data={playersData.slice(0, 10)}
      />
    </div>
  );
}

export default PaginaCEO;