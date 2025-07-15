import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="main">
      <section className="home-welcome">
        <h1 className="home-heading">Welcome to the Dashboard System</h1>
        <p className="home-subtext">Manage your dashboards, widgets, and users effortlessly.</p>
      </section>

      <section className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="card-grid">
          <Link to="/create-user" className="quick-card">
            <h3>Create User</h3>
            <p>Add new users with assigned roles.</p>
          </Link>
          <Link to="/create-dashboard" className="quick-card">
            <h3>Create Dashboard</h3>
            <p>Build a new dashboard and manage widgets.</p>
          </Link>
          <Link to="/create-widget" className="quick-card">
            <h3>Create Widget</h3>
            <p>Add SQL-driven widgets to dashboards.</p>
          </Link>
          <Link to="/view-dashboards" className="quick-card">
            <h3>View Dashboards</h3>
            <p>Browse and manage all your dashboards.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

