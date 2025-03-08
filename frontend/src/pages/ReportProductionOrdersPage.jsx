import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportProductionOrdersTable from '../components/ReportProductionOrdersTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportProductionOrdersPage = () => {
  const [productionOrders, setProductionOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchProductionOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/production-orders/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setProductionOrders(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductionOrders();
    const interval = setInterval(() => {
      fetchProductionOrders();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedOrders = [...productionOrders].sort((a, b) => {
      const aValue = column === 'product' ? a.product.title : a[column];
      const bValue = column === 'product' ? b.product.title : b[column];

      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setProductionOrders(sortedOrders);
    setSortConfig({ key: column, direction });
  };

  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const exportToCSV = () => {
    const header = ['Продукт', 'Количество', 'Дата заказа', 'Запланированная дата завершения', 'Реальная дата завершения', 'Статус'];
    const rows = productionOrders.map(order => [
      order.product ? order.product.title : 'Неизвестно',
      order.quantity,
      order.orderDate ? new Date(order.orderDate).toLocaleString() : '',
      order.plannedCompletionDate ? new Date(order.plannedCompletionDate).toLocaleDateString() : '',
      order.actualCompletionDate ? new Date(order.actualCompletionDate).toLocaleDateString() : '',
      order.status,
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'production_orders.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportProductionOrdersTable 
        productionOrders={productionOrders} 
        sortConfig={sortConfig} 
        onSort={handleSort} 
        getSortArrow={getSortArrow} 
      />
    </div>
  );
};

export default ReportProductionOrdersPage;
