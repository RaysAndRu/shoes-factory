import React from 'react';

const ReportWarehousesTableRow = ({ warehouse }) => {
  return (
    <tr>
      <td>
        {warehouse.responsibleEmployee
          ? `${warehouse.responsibleEmployee.lastName} ${warehouse.responsibleEmployee.firstName}`
          : 'Неизвестно'}
      </td>
      <td>{warehouse.address}</td>
      <td>{warehouse.phone}</td>
      <td>{warehouse.productQuantity}</td>
    </tr>
  );
};

export default ReportWarehousesTableRow;
