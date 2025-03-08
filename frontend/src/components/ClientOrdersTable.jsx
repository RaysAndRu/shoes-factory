import React from 'react';

const OrdersTable = ({ orders, onUpdate, onDelete }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Продукт</th>
            <th>Количество</th>
            <th>Дата заказа</th>
            <th>Ожидаемая дата доставки</th>
            <th>Адрес доставки</th>
            <th>Способ оплаты</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client ? `${order.client.formOrganization} (${order.client.id})` : 'Не указан'}</td>
              <td>{order.product ? `${order.product.title} (${order.product.id})` : 'Не указан'}</td>
              <td>{order.quantity}</td>
              <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : 'Не указана'}</td>
              <td>{order.expectedDeliveryDate}</td>
              <td>{order.deliveryAddress}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.status}</td>
              <td>
                <button className="update-button" onClick={() => onUpdate(order)}>Обновить</button>
                <button className="delete-button" onClick={() => onDelete(order.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
