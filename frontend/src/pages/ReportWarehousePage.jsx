import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportWarehousesTable from '../components/ReportWarehousesTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportWarehousesPage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Function to fetch data
  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/warehouses/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setWarehouses(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  // Auto refresh data every minute
  useEffect(() => {
    fetchWarehouses();
    const interval = setInterval(() => {
      fetchWarehouses();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sorting function
  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedWarehouses = [...warehouses].sort((a, b) => {
      const aValue = column === 'responsibleEmployee'
        ? a.responsibleEmployee ? a.responsibleEmployee.lastName : ''
        : a[column];
      const bValue = column === 'responsibleEmployee'
        ? b.responsibleEmployee ? b.responsibleEmployee.lastName : ''
        : b[column];

      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setWarehouses(sortedWarehouses);
    setSortConfig({ key: column, direction });
  };

  // Get sort arrow for a column
  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // Export data to CSV
  const exportToCSV = () => {
    const header = ['Ответственный сотрудник', 'Адрес', 'Телефон', 'Количество продукции'];
    const rows = warehouses.map(warehouse => [
      `${warehouse.responsibleEmployee ? warehouse.responsibleEmployee.lastName : 'Неизвестно'} ${warehouse.responsibleEmployee ? warehouse.responsibleEmployee.firstName : ''}`,
      warehouse.address,
      warehouse.phone,
      warehouse.productQuantity,
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'warehouses.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportWarehousesTable
        warehouses={warehouses}
        handleSort={handleSort}
        getSortArrow={getSortArrow}
      />
    </div>
  );
};

export default ReportWarehousesPage;
