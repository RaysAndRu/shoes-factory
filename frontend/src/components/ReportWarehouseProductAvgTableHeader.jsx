import React from 'react';

const ReportWarehouseProductAvgTableHeader = ({ handleSort, getSortArrow }) => {
  return (
    <tr>
      <th onClick={() => handleSort('warehouseId')}>
        ID склада {getSortArrow('warehouseId')}
      </th>
      <th onClick={() => handleSort('address')}>
        Адрес {getSortArrow('address')}
      </th>
      <th onClick={() => handleSort('averagePrice')}>
        Среднее количество продуктов {getSortArrow('averagePrice')}
      </th>
    </tr>
  );
};

export default ReportWarehouseProductAvgTableHeader;
