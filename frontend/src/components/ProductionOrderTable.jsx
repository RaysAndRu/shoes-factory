// ProductionOrderTable.js
import React from 'react';
import '../assets/css/Table.css';

const ProductionOrderTable = ({ productionOrders, onUpdate, onDelete }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Продукт</th>
            <th>Количество</th>
            <th>Дата заказа</th>
            <th>Планируемая дата завершения</th>
            <th>Реальная дата завершения</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {productionOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product ? order.product.title : 'Не указан'}</td>
              <td>{order.quantity}</td>
              <td>
                {order.orderDate
                  ? new Date(order.orderDate).toLocaleString()
                  : 'Не указана'}
              </td>
              <td>{order.plannedCompletionDate}</td>
              <td>
                {order.actualCompletionDate
                  ? order.actualCompletionDate
                  : 'Не завершен'}
              </td>
              <td>{order.status}</td>
              <td>
                <button
                  className="update-button"
                  onClick={() => onUpdate(order)}
                >
                  Обновить
                </button>
                <button
                  className="delete-button"
                  onClick={() => onDelete(order.id)}
                >
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

export default ProductionOrderTable;
