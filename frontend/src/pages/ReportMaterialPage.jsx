import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportMaterialsTable from '../components/ReportMaterialsTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportMaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/materials/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setMaterials(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
    const interval = setInterval(() => {
      fetchMaterials();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedMaterials = [...materials].sort((a, b) => {
      const aValue = column === 'supplier' ? (a.supplier ? a.supplier.title : '') : a[column];
      const bValue = column === 'supplier' ? (b.supplier ? b.supplier.title : '') : b[column];

      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setMaterials(sortedMaterials);
    setSortConfig({ key: column, direction });
  };

  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const exportToCSV = () => {
    const header = ['Поставщик', 'Название', 'Цена', 'Количество', 'Ед. измерения', 'Дата поставки'];
    const rows = materials.map(material => [
      material.supplier ? material.supplier.name : 'Неизвестно',
      material.title,
      material.price,
      material.quantity,
      material.unitOfMeasure,
      material.supplyDate,
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'materials.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportMaterialsTable 
        materials={materials} 
        sortConfig={sortConfig} 
        onSort={handleSort} 
        getSortArrow={getSortArrow} 
      />
    </div>
  );
};

export default ReportMaterialsPage;
