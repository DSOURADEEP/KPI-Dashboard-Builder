import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="main">
      <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '1rem', color: 'var(--primary)' }}>
          Welcome to the KPI Dashboard Builder
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-soft)', marginBottom: '2rem' }}>
          This application lets you create powerful, visually-rich dashboards by writing raw SQL queries.
          It’s ideal for managers, analysts, and developers who want to track performance indicators,
          visualize data from existing tables, and present it all through interactive charts.
        </p>

        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <h2 style={{ color: 'var(--text)' }}>🔍 Key Features:</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '1.5rem', marginTop: '1rem' }}>
            <li><strong>Create Users:</strong> Define users who will own dashboards.</li>
            <li><strong>Create Dashboards:</strong> Group related widgets under a named container.</li>
            <li><strong>Create Widgets:</strong> Add SQL-powered visualizations like bar, pie, line charts.</li>
            <li><strong>SQL-Based Charts:</strong> Write your own SQL query — results will be visualized automatically.</li>
            <li><strong>Dark Mode Support:</strong> Switch between light and dark themes effortlessly.</li>
            <li><strong>Live Data Ready:</strong> Planned integration for real-time charting from actual DB results.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/create-user" className="btn btn-animate">➕ Create User</Link>
          <Link to="/create-dashboard" className="btn btn-animate">📊 Create Dashboard</Link>
          <Link to="/create-widget" className="btn btn-animate">📌 Add Widget</Link>
          <Link to="/view-dashboards" className="btn btn-animate">📈 View Dashboards</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

