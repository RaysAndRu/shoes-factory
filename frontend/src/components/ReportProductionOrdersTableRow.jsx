import React from 'react';

const ReportProductionOrdersTableRow = ({ order }) => {
  return (
    <tr>
      <td>{order.product ? order.product.title : 'Неизвестно'}</td>
      <td>{order.quantity}</td>
      <td>{order.orderDate ? new Date(order.orderDate).toLocaleString() : ''}</td>
      <td>{order.plannedCompletionDate ? new Date(order.plannedCompletionDate).toLocaleDateString() : ''}</td>
      <td>{order.actualCompletionDate ? new Date(order.actualCompletionDate).toLocaleDateString() : 'В производстве'}</td>
      <td>{order.status}</td>
    </tr>
  );
};

export default ReportProductionOrdersTableRow;
