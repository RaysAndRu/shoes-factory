import React from 'react';

const ReportMaterialsTableRow = ({ material }) => {
  return (
    <tr>
      <td>{material.supplier ? material.supplier.title : 'Неизвестно'}</td>
      <td>{material.title}</td>
      <td>{material.price}</td>
      <td>{material.quantity}</td>
      <td>{material.unitOfMeasure}</td>
      <td>{material.supplyDate}</td>
    </tr>
  );
};

export default ReportMaterialsTableRow;
