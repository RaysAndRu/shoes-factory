import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportClientTable from '../components/ReportClientTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/clients/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setClients(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    const interval = setInterval(() => {
      fetchClients();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedClients = [...clients].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'ascending' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setClients(sortedClients);
    setSortConfig({ key: column, direction });
  };

  const exportToCSV = () => {
    const header = ['Фамилия', 'Имя', 'Отчество', 'Организация', 'Контакты', 'Email', 'Телефон', 'Тип'];
    const rows = clients.map(client => [
      client.lastName,
      client.firstName,
      client.middleName,
      client.formOrganization,
      client.contactDetails,
      client.email,
      client.phone,
      client.type,
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'clients.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportClientTable clients={clients} sortConfig={sortConfig} onSort={handleSort} />
    </div>
  );
};

export default ReportClientsPage;
