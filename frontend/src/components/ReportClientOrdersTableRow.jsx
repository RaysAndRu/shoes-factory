import React from 'react';

const ReportClientOrdersTableRow = ({ order }) => {
  return (
    <tr>
      <td>{order.client ? order.client.formOrganization : 'Неизвестно'}</td>
      <td>{order.product ? order.product.title : 'Неизвестно'}</td>
      <td>{order.quantity}</td>
      <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : ''}</td>
      <td>{order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString() : ''}</td>
      <td>{order.deliveryAddress}</td>
      <td>{order.paymentMethod}</td>
      <td>{order.status}</td>
    </tr>
  );
};

export default ReportClientOrdersTableRow;
