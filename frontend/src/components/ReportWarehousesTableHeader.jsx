import React from 'react';

const ReportWarehousesTableHeader = ({ handleSort, getSortArrow }) => {
  return (
    <tr>
      <th onClick={() => handleSort('responsibleEmployee')}>
        Ответственный сотрудник {getSortArrow('responsibleEmployee')}
      </th>
      <th onClick={() => handleSort('address')}>
        Адрес {getSortArrow('address')}
      </th>
      <th onClick={() => handleSort('phone')}>
        Телефон {getSortArrow('phone')}
      </th>
      <th onClick={() => handleSort('productQuantity')}>
        Количество продукции {getSortArrow('productQuantity')}
      </th>
    </tr>
  );
};

export default ReportWarehousesTableHeader;
