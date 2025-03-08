import React from 'react';

const ReportProductWarehouseTableHeader = ({ handleSort, getSortArrow }) => {
  return (
    <tr>
      <th onClick={() => handleSort('product')}>
        Продукт {getSortArrow('product')}
      </th>
      <th onClick={() => handleSort('warehouse')}>
        Склад {getSortArrow('warehouse')}
      </th>
      <th onClick={() => handleSort('quantity')}>
        Количество {getSortArrow('quantity')}
      </th>
    </tr>
  );
};

export default ReportProductWarehouseTableHeader;
