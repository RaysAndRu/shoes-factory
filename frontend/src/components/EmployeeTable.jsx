import React from 'react';
import '../assets/css/Table.css';

const EmployeeTable = ({ employees, onUpdate, onDelete }) => {
  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length === 11 && phoneDigits.startsWith('7')) {
      return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4, 7)}-${phoneDigits.slice(7, 9)}-${phoneDigits.slice(9, 11)}`;
    }
    return phone;
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Дата рождения</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Дата найма</th>
            <th>Дата увольнения</th>
            <th>Серия паспорта</th>
            <th>Номер паспорта</th>
            <th>Должность</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.lastName}</td>
              <td>{employee.firstName}</td>
              <td>{employee.middleName}</td>
              <td>{employee.dateOfBirth}</td>
              <td>{formatPhoneNumber(employee.phone)}</td>
              <td>{employee.email}</td>
              <td>{employee.hireDate}</td>
              <td>{employee.dismissalDate}</td>
              <td>{employee.passportSeries}</td>
              <td>{employee.passportNumber}</td>
              <td>{employee.position}</td>
              <td>{employee.status}</td>
              <td>
                <button className="update-button" onClick={() => onUpdate(employee)}>
                  Обновить
                </button>
                <button className="delete-button" onClick={() => onDelete(employee.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
