import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import ChartRenderer from '../components/ChartRenderer'; // Make sure this path is correct

const GET_DASHBOARDS = gql`
  query GetDashboards {
    dashboards {
      id
      title
      widgets {
        id
        type
        sqlQuery
      }
    }
  }
`;

const parseMockData = (sqlQuery: string) => {
  if (sqlQuery.includes('sales_data')) {
    return { labels: ['Jan', 'Feb', 'Mar', 'Apr'], values: [12000, 15000, 18000, 21000] };
  }
  if (sqlQuery.includes('customers')) {
    return { labels: ['18-25', '26-35', '36-45'], values: [80, 120, 60] };
  }
  if (sqlQuery.includes('sales_by_region')) {
    return { labels: ['North', 'South', 'East', 'West'], values: [3000, 5000, 2000, 4000] };
  }
  if (sqlQuery.includes('inventory')) {
    return { labels: ['Electronics', 'Furniture', 'Clothing'], values: [70, 40, 90] };
  }

  return { labels: ['A', 'B', 'C'], values: [10, 20, 30] };
};

const Dashboards: React.FC = () => {
  const { data, loading, error } = useQuery(GET_DASHBOARDS);
  const [selectedDashboardId, setSelectedDashboardId] = useState<number | 'all'>('all');

  if (loading) return <p>Loading dashboards...</p>;
  if (error) return <p>Error loading dashboards: {error.message}</p>;

  const dashboards = data?.dashboards || [];

  const filteredDashboards =
    selectedDashboardId === 'all'
      ? dashboards
      : dashboards.filter((d: any) => d.id === selectedDashboardId);

  return (
    <div className="main">
      <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="dashboard-select" style={{ fontWeight: 'bold', marginRight: '10px' }}>
          Select Dashboard:
        </label>
        <select
          id="dashboard-select"
          className="btn"
          value={selectedDashboardId}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedDashboardId(val === 'all' ? 'all' : parseInt(val));
          }}
        >
          <option value="all">All Dashboards</option>
          {dashboards.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.title} (ID: {d.id})
            </option>
          ))}
        </select>
      </div>

      <div className="dashboard-container">
        {filteredDashboards.map((dashboard: any) => (
          <div key={dashboard.id} className="dashboard-section">
            <h2 className="dashboard-title">
              {dashboard.title}{' '}
              <span style={{ fontSize: '0.9rem', color: 'var(--text-soft)' }}>
                (ID: {dashboard.id})
              </span>
            </h2>

            <div className="widget-grid">
              {dashboard.widgets.length > 0 ? (
                dashboard.widgets.map((widget: any) => (
                  <div key={widget.id} className="widget-card">
                    <h3>{widget.type.toUpperCase()} Chart</h3>
                    <div style={{ height: '250px' }}>
                      <ChartRenderer
                        type={widget.type}
                        data={parseMockData(widget.sqlQuery)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'gray', fontStyle: 'italic' }}>No widgets available.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboards;


