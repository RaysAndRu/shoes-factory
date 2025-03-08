import React from 'react';

const ReportWarehouseProductAvgTableRow = ({ item }) => {
  return (
    <tr>
      <td>{item.warehouseId}</td>
      <td>{item.address}</td>
      <td>{item.averagePrice.toFixed(2)}</td>
    </tr>
  );
};

export default ReportWarehouseProductAvgTableRow;
