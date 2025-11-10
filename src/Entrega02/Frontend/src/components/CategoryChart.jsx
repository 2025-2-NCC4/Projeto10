// Em src/components/CategoryChart.jsx
import React from 'react';
import styles from './CategoryChart.module.css';
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

// --- Função para processar os dados ---
const processDataForChart = (data) => {

  // 1. *** O "TRADUTOR" / "AGRUPADOR" DE NOMES ***
  const getCategoryGroup = (originalName) => {
    // 1A. LIMPA o nome (remove espaços do início/fim E espaços duplicados no meio)
    const cleanName = originalName.trim().replace(/\s+/g, ' '); 
    
    // 1B. APLICA AS REGRAS de tradução
    // (Sinta-se à vontade para editar o texto "depois" dos :)
    
    // Regras da sua última lista
    if (cleanName === 'Igrejas e Lojas de Artigos Religiosos') return 'Artigos Religiosos';
    if (cleanName === 'Farmácias e Drogarias') return 'Farmácias';
    if (cleanName === 'Lojas de Móveis e Decoração') return 'Móveis/Decoração';
    if (cleanName === 'Clínicas de Saúde e Bem-estar') return 'Saúde/Bem-estar';
    if (cleanName === 'Restaurantes e Gastronomia') return 'Gastronomia';
    if (cleanName === 'Papelarias, Livrarias e Lojas de Escritório') return 'Papelaria/Escritório';
    if (cleanName === 'Supermercados e Mercados Express') return 'Supermercados';
    if (cleanName === 'Coworkings e Centros de Estudo/Conexão') return 'Coworking/Estudo';
    if (cleanName === 'Bancos e Casas Lotéricas') return 'Bancos/Lotéricas';
    if (cleanName === 'Espaços Culturais e de Experiência Interativa') return 'Cultura/Experiência';

    // Regras da imagem anterior
    if (cleanName === 'Restaurantes') return 'Restaur.';
    if (cleanName === 'Lanchonetes') return 'Lanches';
    if (cleanName === 'Supermercados') return 'Superm.';
    if (cleanName === 'Alimentação - Outros') return 'Alim. (Outros)';
    if (cleanName === 'Vestuário - Acessórios') return 'Acessórios';
    if (cleanName === 'Artigos Esportivos') return 'Esportes';

    // Se não houver regra, retorne o nome limpo
    return cleanName;
  };

  // 2. Contar as ocorrências JÁ AGRUPADAS
  const categoryCounts = {};
  data.forEach(row => {
    const originalCategory = row.categoria_estabelecimento;
    if (!originalCategory) return;

    // Passa o nome original pelo "tradutor"
    const groupName = getCategoryGroup(originalCategory); 

    // Conta o nome do grupo
    if (!categoryCounts[groupName]) {
      categoryCounts[groupName] = 0;
    }
    categoryCounts[groupName]++;
  });

  // 3. Converte o objeto para um array
  const chartData = Object.keys(categoryCounts).map(groupName => ({
    name: groupName,
    total: categoryCounts[groupName],
  }))
  .sort((a, b) => b.total - a.total); // Ordena

  // 4. Retorna os Top 10
  return chartData.slice(0, 10);
};


function CategoryChart({ title, data }) {
  if (!data || data.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Sem dados para exibir.</p>
      </div>
    );
  }

  const chartData = processDataForChart(data);

  if (!chartData || chartData.length === 0) {
    return (
      <div className={styles.chartContainer}>
        <h2>{title}</h2>
        <p>Não foi possível processar os dados para o gráfico.</p>
      </div>
    );
  }

  return (
    <div className={styles.chartContainer}>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart 
          data={chartData} 
          layout="vertical"
          // Espaçamento entre as barras
          barCategoryGap="20%" 
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          {/* Aumentamos o 'width' para dar espaço aos nomes */}
          <YAxis dataKey="name" type="category" width={150} />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#82ca9d" name="Total de Cupons" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;