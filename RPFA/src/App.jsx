// /src/App.jsx
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardContainer from './components/DashboardContainer';

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <DashboardContainer />
      </div>
    </div>
  );
}

export default App;