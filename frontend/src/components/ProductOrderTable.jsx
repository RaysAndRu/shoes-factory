// src/components/ProductOrderTable.js
import React from 'react';
import '../assets/css/Table.css';

const ProductOrderTable = ({ products, onUpdate, onDelete }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Артикул</th>
            <th>Размер</th>
            <th>Цвет</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.article}</td>
              <td>{product.size}</td>
              <td>{product.color}</td>
              <td>
                <button className="update-button" onClick={() => onUpdate(product)}>
                  Обновить
                </button>
                <button className="delete-button" onClick={() => onDelete(product.id)}>
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

export default ProductOrderTable;
