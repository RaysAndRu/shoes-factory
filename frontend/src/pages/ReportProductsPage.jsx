import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportProductsTable from '../components/ReportProductsTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/products/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      fetchProducts();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedProducts = [...products].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'ascending' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setProducts(sortedProducts);
    setSortConfig({ key: column, direction });
  };

  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const exportToCSV = () => {
    const header = ['Название', 'Цена', 'Артикул', 'Размер', 'Цвет'];
    const rows = products.map(product => [
      product.title,
      product.price,
      product.article,
      product.size,
      product.color,
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'products.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportProductsTable
        products={products}
        handleSort={handleSort}
        getSortArrow={getSortArrow}
      />
    </div>
  );
};

export default ReportProductsPage;
