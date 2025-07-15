import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import CreateWidget from './pages/CreateWidget';
import CreateUser from './pages/CreateUser';
import CreateDashboard from './pages/CreateDashboard';
import Dashboards from './pages/Dashboards';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.css';
import { useEffect, useState } from 'react';

const PageTitle = () => {
  const location = useLocation();
  const map: { [key: string]: string } = {
    '/create-user': 'Create User',
    '/create-dashboard': 'Create Dashboard',
    '/create-widget': 'Create Widget',
    '/view-dashboards': 'Dashboards',
    '/': 'Dashboard System',
  };
  return <h1 className="title">{map[location.pathname] || 'Dashboard System'}</h1>;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      
        <header className="header">
          <PageTitle />
          <nav className="nav">
            <Link to="/" className="btn">Home</Link>
            <Link to="/create-user" className="btn">Create User</Link>
            <Link to="/create-dashboard" className="btn">Create Dashboard</Link>
            <Link to="/create-widget" className="btn">Create Widget</Link>
            <Link to="/view-dashboards" className="btn">View Dashboards</Link>
            <button onClick={() => setDarkMode(prev => !prev)} className="btn toggle-btn">
              {darkMode ? '🌞 Light' : '🌙 Dark'}
            </button>
          </nav>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/create-dashboard" element={<CreateDashboard />} />
            <Route path="/create-widget" element={<CreateWidget />} />
            <Route path="/view-dashboards" element={<Dashboards />} />
          </Routes>
        </main>
      
      <ToastContainer />
    </div>
  );
}

export default App;

