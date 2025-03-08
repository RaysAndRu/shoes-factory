import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientOrdersTable from '../components/ReportClientOrdersTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportClientOrdersPage = () => {
  const [clientOrders, setClientOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchClientOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/client-orders/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setClientOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientOrders();
    const interval = setInterval(fetchClientOrders, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedOrders = [...clientOrders].sort((a, b) => {
      const aValue = column === 'product' ? a.product.title : column === 'client' ? a.client.formOrganization : a[column];
      const bValue = column === 'product' ? b.product.title : column === 'client' ? b.client.formOrganization : b[column];

      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setClientOrders(sortedOrders);
    setSortConfig({ key: column, direction });
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton clientOrders={clientOrders} />
      <ClientOrdersTable clientOrders={clientOrders} handleSort={handleSort} sortConfig={sortConfig} />
    </div>
  );
};

export default ReportClientOrdersPage;
