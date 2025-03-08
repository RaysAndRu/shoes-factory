import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportWarehouseProductAvgTable from '../components/ReportWarehouseProductAvgTable';
import ExportButton from '../components//ExportButton';
import '../assets/css/Table.css';

const ReportWarehouseProductAvgPage = () => {
  const [warehouseAvgData, setWarehouseAvgData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // Function to fetch data from the endpoint
  const fetchWarehouseAvgData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/warehouses/all/average-products', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setWarehouseAvgData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  // Auto-refresh data every minute
  useEffect(() => {
    fetchWarehouseAvgData();
    const interval = setInterval(() => {
      fetchWarehouseAvgData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sorting function
  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...warehouseAvgData].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setWarehouseAvgData(sortedData);
    setSortConfig({ key: column, direction });
  };

  // Returns the sorting arrow for a column
  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  // CSV export function
  const exportToCSV = () => {
    const header = ['ID склада', 'Адрес', 'Среднее количество продуктов'];
    const rows = warehouseAvgData.map(item => [
      item.warehouseId,
      item.address,
      item.averagePrice.toFixed(2),
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'warehouse_product_average.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportWarehouseProductAvgTable
        warehouseAvgData={warehouseAvgData}
        handleSort={handleSort}
        getSortArrow={getSortArrow}
      />
    </div>
  );
};

export default ReportWarehouseProductAvgPage;
