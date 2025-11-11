
# FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
<a href= "https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" border="0"></a>
</p>

# PicMoney - Dashboard Interativo (Projeto Evew)

## GRUPO 10 - EVEW 

## Integrantes: <a>Felipe Vallim Soares</a>, <a>João Victor Rezende</a>, <a>Pedro Della Rosa Antônio</a>, <a>Arthur Paltrinieri</a>

## Professores Orientadores: <a>Eduardo Savino</a>, <a>Lucy Mari</a>, <a>Rodnil Silva</a>, <a>David Lemos</a>, <a>Maurício Lopes</a>

## Descrição

<p align="center">
<img width="600" alt="Prévia do Dashboard EasyView" src="https://github.com/user-attachments/assets/ebcfe6b7-a726-48dd-b336-c24e900ce05c" />
</p>

Este projeto consiste em um Dashboard Interativo desenvolvido para a empresa **PicMoney** pela **Evew**. A solução é voltada para o público C-Level (CEO, CTO), integrando e apresentando, de forma responsiva, indicadores estratégicos, financeiros e operacionais.

O objetivo principal é transformar dados de múltiplas fontes (Players, Cupons, Lojas e Pedestres) em visualizações claras e acionáveis, suportando diretamente a tomada de decisão executiva. O dashboard conta com visões segmentadas, Dark Mode e análises de cruzamento de dados.



## 🛠 Estrutura de pastas

A estrutura do projeto está organizada da seguinte forma:

-Raiz<br>
|<br>
|-->documentos<br>
&emsp;|--> (Documentação do PI, PDFs, etc.)<br>
|-->imagens<br>
&emsp;|--> (Screenshots e assets do projeto)<br>
|-->src<br>
&emsp;|-->Entrega01<br>
&emsp;&emsp;|-->Backend<br>
&emsp;&emsp;|-->Frontend<br>
&emsp;|-->Entrega02<br>
&emsp;&emsp;|-->Backend<br>
&emsp;&emsp;|-->Frontend<br>
|readme.md<br>

## 🛠 Instalação e Execução

Para executar este projeto localmente, você precisará de dois terminais rodando simultaneamente (um para o Backend e um para o Frontend).

### 1. Back-end 

O Backend é responsável por ler os arquivos `.csv`, limpá-los, realizar análises complexas (como cruzamento de dados) e servi-los via API.

**Navegue até a pasta do Back-end:**
```sh
cd src/Entrega02/Backend
```

Instale e Execute:

```sh
npm install
npm run dev
```

### 1. Front-end

O Frontend é responsável por toda a parte visual e execução dos dashboards
**Navegue até a pasta do Front-end:**
```sh
cd src/Entrega02/Frontend
```

Instale e Execute:

```sh
npm install
npm run dev
```

## 📋 Licença/License
<a href="https://example.com">Evew</a> © by <a href="https://example.com">Pedro Della Rosa Antônio, Felipe Vallim Soares, João Victor Rezende, Arthur Paltrinieri</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> 

## 🎓 Referências e Tecnologias

Aqui estão as referências usadas no projeto.

* Base de Dados da PicMoney
* Análise de Dados: Python (Pandas, Plotly) em Google Colab
Backend: Node.js, Express.js
* Frontend: React, Vite
* Leitura de CSV (Node): csv-parser, iconv-lite
* Visualização (Dashboard): Recharts
* Roteamento: React Router
* Estilização: CSS Modules, React Icons

