import React from 'react';

const ReportProductWarehouseTableRow = ({ item }) => {
  return (
    <tr>
      <td>{item.product ? item.product.title : 'Неизвестно'}</td>
      <td>{item.warehouse ? item.warehouse.address : 'Неизвестно'}</td>
      <td>{item.quantity}</td>
    </tr>
  );
};

export default ReportProductWarehouseTableRow;
