// src/components/ProductWarehouseTable.js
import React from 'react';
import '../assets/css/Table.css';

const ProductWarehouseTable = ({ productWarehouses, onUpdate, onDelete }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Склад</th>
            <th>Продукт</th>
            <th>Количество</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {productWarehouses.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>
                {record.warehouse
                  ? `${record.warehouse.address} (ID ${record.warehouse.id})`
                  : 'Не указан'}
              </td>
              <td>
                {record.product
                  ? `${record.product.title} (ID: ${record.product.id})`
                  : 'Не указан'}
              </td>
              <td>{record.quantity}</td>
              <td>
                <button className="update-button" onClick={() => onUpdate(record)}>
                  Обновить
                </button>
                <button className="delete-button" onClick={() => onDelete(record.id)}>
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

export default ProductWarehouseTable;
