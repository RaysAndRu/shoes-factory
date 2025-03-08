import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportSuppliersTable from '../components/ReportSuppliersTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportSuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Function to load data
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/suppliers/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setSuppliers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  // Auto refresh data every minute
  useEffect(() => {
    fetchSuppliers();
    const interval = setInterval(() => {
      fetchSuppliers();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Sorting function
  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedSuppliers = [...suppliers].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'ascending' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSuppliers(sortedSuppliers);
    setSortConfig({ key: column, direction });
  };

  // Get sort arrow
  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // CSV export function
  const exportToCSV = () => {
    const header = ['Название', 'Контактные данные', 'Адрес', 'Телефон', 'Email', 'ИНН'];
    const rows = suppliers.map(supplier => [
      supplier.title,
      supplier.contactDetails,
      supplier.address,
      supplier.phone,
      supplier.email,
      supplier.tin,
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'suppliers.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportSuppliersTable 
        suppliers={suppliers} 
        handleSort={handleSort} 
        getSortArrow={getSortArrow} 
      />
    </div>
  );
};

export default ReportSuppliersPage;
