import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportClientSalesTable from '../components/ReportClientSalesTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportClientSalesPage = () => {
  const [clientSales, setClientSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClientSales = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/clients/all/sales', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setClientSales(response.data);
    } catch (error) {
      setError('Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientSales();
    const interval = setInterval(fetchClientSales, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton data={clientSales} />
      <ReportClientSalesTable clientSales={clientSales} />
    </div>
  );
};

export default ReportClientSalesPage;
