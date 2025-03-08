import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportEmployeesTable from '../components/ReportEmployeesTable';
import ExportButton from '../components/ExportButton';
import '../assets/css/Table.css';

const ReportEmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/employees/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      setError('Ошибка при загрузке данных');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    const interval = setInterval(() => {
      fetchEmployees();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedEmployees = [...employees].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'ascending' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setEmployees(sortedEmployees);
    setSortConfig({ key: column, direction });
  };

  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const exportToCSV = () => {
    const header = [
      'Фамилия', 'Имя', 'Отчество', 'Дата рождения', 'Телефон', 'Email',
      'Дата приема', 'Дата увольнения', 'Серия паспорта', 'Номер паспорта', 'Должность', 'Статус'
    ];
    const rows = employees.map(employee => [
      employee.lastName,
      employee.firstName,
      employee.middleName,
      employee.dateOfBirth,
      employee.phone,
      employee.email,
      employee.hireDate,
      employee.dismissalDate,
      employee.passportSeries,
      employee.passportNumber,
      employee.position,
      employee.status,
    ]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employees.csv';
    link.click();
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="report-container">
      <ExportButton onExport={exportToCSV} />
      <ReportEmployeesTable employees={employees} sortConfig={sortConfig} onSort={handleSort} getSortArrow={getSortArrow} />
    </div>
  );
};

export default ReportEmployeesPage;
