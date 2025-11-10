// Em backend/index.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const iconv = require('iconv-lite'); // Nosso "tradutor" de acentos

// --- Função Auxiliar (A versão estável) ---
const readCsvFile = (filename) => {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, 'data', filename);

    fs.createReadStream(filePath)
      .pipe(iconv.decodeStream('latin1')) // Decodifica de latin1 (Windows)
      .pipe(csv({
        separator: ';',
        mapHeaders: ({ header }) => header.replace(/\ufeff/g, '').trim()
      }))
      .on('data', (data) => {
        // Adiciona todas as linhas
        results.push(data);
      })
      .on('end', () => {
        // Filtra o lixo (ex: "Pgina 1 de 1") SÓ NO FINAL
        const cleanResults = results.filter(row => {
          const firstValue = Object.values(row)[0];
          return firstValue && !String(firstValue).startsWith('Pgina');
        });

        console.log(`[CSV Reader] ${filename}: ${cleanResults.length} linhas lidas.`);
        resolve(cleanResults);
      })
      .on('error', (error) => {
        console.error(`Erro ao ler o arquivo CSV ${filename}:`, error);
        reject(error);
      });
  });
};

// --- Configuração de Middlewares ---
app.use(cors());
app.use(express.json());

// --- ROTAS DE DADOS BÁSICAS (As 4 principais) ---
app.get('/api/players', async (req, res) => {
  try {
    const data = await readCsvFile('players.csv');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao ler dados de players.' });
  }
});
app.get('/api/cupons', async (req, res) => {
  try {
    const data = await readCsvFile('cupons.csv');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao ler dados de cupons.' });
  }
});
app.get('/api/lojas', async (req, res) => {
  try {
    const data = await readCsvFile('lojas.csv');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao ler dados de lojas.' });
  }
});
app.get('/api/pedestres', async (req, res) => {
  try {
    const data = await readCsvFile('pedestres.csv');
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao ler dados de pedestres.' });
  }
});

// --- ROTA DE RELACIONAMENTO (Receita por Bairro - Esta funciona) ---
app.get('/api/valor-por-bairro', async (req, res) => {
  try {
    const [players, cupons] = await Promise.all([readCsvFile('players.csv'), readCsvFile('cupons.csv')]);
    
    // Criamos o mapa de Player -> Bairro
    const playerMap = new Map();
    for (const player of players) {
      if (player.celular && player.bairro_residencial) {
        playerMap.set(player.celular, player.bairro_residencial);
      }
    }

    // Processamos os cupons
    const bairroCounts = {};
    for (const cupom of cupons) {
      const bairro = playerMap.get(cupom.celular);
      const valor = parseFloat(cupom.valor_cupom.replace(',', '.'));
      if (bairro && !isNaN(valor)) {
        if (!bairroCounts[bairro]) { bairroCounts[bairro] = 0; }
        bairroCounts[bairro] += valor;
      }
    }
    
    // Formatamos para o gráfico
    const chartData = Object.keys(bairroCounts).map(bairroName => ({
      name: bairroName,
      total: parseFloat(bairroCounts[bairroName].toFixed(2))
    })).sort((a, b) => b.total - a.total);
    
    console.log(`[API /valor-por-bairro] Dados cruzados. Enviando ${chartData.length} bairros.`);
    res.json(chartData);

  } catch (error) {
    console.error('[API /valor-por-bairro] Erro:', error);
    res.status(500).json({ error: 'Falha ao cruzar dados.' });
  }
});

// --- Rota /api/funil-conversao foi REMOVIDA ---

// --- Iniciar o Servidor ---
app.listen(port, () => {
  console.log(`Servidor backend rodando na porta ${port}`);
});