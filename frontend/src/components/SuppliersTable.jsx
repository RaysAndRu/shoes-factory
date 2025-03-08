// src/components/SuppliersPageTable.js
import React from 'react';
import '../assets/css/Table.css';

const SuppliersPageTable = ({ suppliers, onUpdate, onDelete, formatPhoneNumber }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Контакты</th>
            <th>Адрес</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>ИНН</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.title}</td>
              <td>{supplier.contactDetails}</td>
              <td>{supplier.address}</td>
              <td>{formatPhoneNumber(supplier.phone)}</td>
              <td>{supplier.email}</td>
              <td>{supplier.tin}</td>
              <td>
                <button className="update-button" onClick={() => onUpdate(supplier)}>
                  Обновить
                </button>
                <button className="delete-button" onClick={() => onDelete(supplier.id)}>
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

export default SuppliersPageTable;
