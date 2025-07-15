import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_WIDGET } from '../graphql/mutations';
import { toast } from 'react-toastify';

const CreateWidget = () => {
  const [type, setType] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [layout, setLayout] = useState('');
  const [dashboardId, setDashboardId] = useState<number | ''>('');

  const [createWidget] = useMutation(CREATE_WIDGET);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsedId = Number(dashboardId);
    if (!type || !sqlQuery || !layout || isNaN(parsedId)) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      await createWidget({
        variables: {
          type,
          sqlQuery,
          layout,
          dashboardId: parsedId,
        },
      });
      toast.success('✅ Widget Created');
      setType('');
      setSqlQuery('');
      setLayout('');
      setDashboardId('');
    } catch (err) {
      toast.error('❌ Failed to create widget');
      console.error(err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow-lg mt-6 space-y-4">
      <h2 className="text-xl font-bold text-center">Create Widget</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Widget Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="SQL Query"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Layout"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Dashboard ID"
          value={dashboardId}
          onChange={(e) => setDashboardId(Number(e.target.value))}
          className="input"
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-transform transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateWidget;



