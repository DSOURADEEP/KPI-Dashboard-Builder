import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import WidgetChart from '../components/WidgetChart';

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

const Dashboards: React.FC = () => {
  const { data, loading, error } = useQuery(GET_DASHBOARDS);
  const [selectedDashboardId, setSelectedDashboardId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedDashboardId && data?.dashboards?.length > 0) {
      setSelectedDashboardId(data.dashboards[0].id); // default to first dashboard
    }
  }, [data, selectedDashboardId]);

  if (loading) return <p>Loading dashboards...</p>;
  if (error) return <p>Error loading dashboards: {error.message}</p>;

  const dashboards = data?.dashboards || [];
  const selectedDashboard = dashboards.find((d: any) => d.id === selectedDashboardId);

  return (
    <div className="main">
      <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
        <label htmlFor="dashboard-select" style={{ fontWeight: 'bold', marginRight: '10px' }}>
          Select Dashboard:
        </label>
        <select
          id="dashboard-select"
          className="btn"
          value={selectedDashboardId ?? ''}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedDashboardId(val ? parseInt(val) : null);
          }}
        >
          {dashboards.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.title} (ID: {d.id})
            </option>
          ))}
        </select>
      </div>

      {selectedDashboard ? (
        <div className="dashboard-container">
          <div className="dashboard-section">
            <h2 className="dashboard-title">
              {selectedDashboard.title}{' '}
              <span style={{ fontSize: '0.9rem', color: 'var(--text-soft)' }}>
                (ID: {selectedDashboard.id})
              </span>
            </h2>

            <div className="widget-grid">
              {selectedDashboard.widgets.length > 0 ? (
                selectedDashboard.widgets.map((widget: any) => (
                  <div key={widget.id} className="widget-card">
                    <h3>{widget.type.toUpperCase()} Chart</h3>
                    <div style={{ height: '250px' }}>
                      <WidgetChart type={widget.type} sqlQuery={widget.sqlQuery} />
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'gray', fontStyle: 'italic' }}>No widgets available.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No dashboard selected</p>
      )}
    </div>
  );
};

export default Dashboards;




