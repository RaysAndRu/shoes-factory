import React from 'react';
import ReportEmployeesTableHeader from './ReportEmployeesTableHeader';
import ReportEmployeesTableRow from './ReportEmployeesTableRow';

const ReportEmployeesTable = ({ employees, sortConfig, onSort, getSortArrow }) => {
  const columns = [
    { key: 'lastName', label: 'Фамилия' },
    { key: 'firstName', label: 'Имя' },
    { key: 'middleName', label: 'Отчество' },
    { key: 'dateOfBirth', label: 'Дата рождения' },
    { key: 'phone', label: 'Телефон' },
    { key: 'email', label: 'Email' },
    { key: 'hireDate', label: 'Дата приема' },
    { key: 'dismissalDate', label: 'Дата увольнения' },
    { key: 'passportSeries', label: 'Серия паспорта' },
    { key: 'passportNumber', label: 'Номер паспорта' },
    { key: 'position', label: 'Должность' },
    { key: 'status', label: 'Статус' },
  ];

  return (
    <table className="data-table">
      <ReportEmployeesTableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} getSortArrow={getSortArrow} />
      <tbody>
        {employees.map(employee => (
          <ReportEmployeesTableRow key={employee.id} employee={employee} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportEmployeesTable;
