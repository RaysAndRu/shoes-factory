import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportProductRevenueTable from '../components/ReportProductRevenueTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportProductRevenuePage = () => {
  const [productRevenue, setProductRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchProductRevenue = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/products/all/sales', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setProductRevenue(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductRevenue();
    const interval = setInterval(() => {
      fetchProductRevenue();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedRevenue = [...productRevenue].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setProductRevenue(sortedRevenue);
    setSortConfig({ key: column, direction });
  };

  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const exportToCSV = () => {
    const header = ['ID продукта', 'Название продукта', 'Общая выручка'];
    const rows = productRevenue.map(product => [
      product.productId,
      product.productName,
      product.totalRevenue.toFixed(2),
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'product_revenue.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportProductRevenueTable
        productRevenue={productRevenue}
        sortConfig={sortConfig}
        onSort={handleSort}
        getSortArrow={getSortArrow}
      />
    </div>
  );
};

export default ReportProductRevenuePage;
