import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportProductWarehouseTable from '../components/ReportProductWarehouseTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportProductWarehousePage = () => {
  const [productWarehouses, setProductWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchProductWarehouses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/product-warehouses/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setProductWarehouses(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductWarehouses();
    const interval = setInterval(() => {
      fetchProductWarehouses();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedProductWarehouses = [...productWarehouses].sort((a, b) => {
      const aValue =
        column === 'product'
          ? a.product ? a.product.title : ''
          : column === 'warehouse'
          ? a.warehouse ? a.warehouse.address : ''
          : a[column];
      const bValue =
        column === 'product'
          ? b.product ? b.product.title : ''
          : column === 'warehouse'
          ? b.warehouse ? b.warehouse.address : ''
          : b[column];

      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setProductWarehouses(sortedProductWarehouses);
    setSortConfig({ key: column, direction });
  };

  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const exportToCSV = () => {
    const header = ['Продукт', 'Склад', 'Количество'];
    const rows = productWarehouses.map(item => [
      item.product ? item.product.title : 'Неизвестно',
      item.warehouse ? item.warehouse.name : 'Неизвестно',
      item.quantity,
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'product_warehouses.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportProductWarehouseTable 
        productWarehouses={productWarehouses} 
        handleSort={handleSort} 
        getSortArrow={getSortArrow} 
      />
    </div>
  );
};

export default ReportProductWarehousePage;
