import React from 'react';

const ReportSuppliersTableHeader = ({ handleSort, getSortArrow }) => {
  return (
    <tr>
      <th onClick={() => handleSort('title')}>
        Название {getSortArrow('title')}
      </th>
      <th onClick={() => handleSort('contactDetails')}>
        Контактные данные {getSortArrow('contactDetails')}
      </th>
      <th onClick={() => handleSort('address')}>
        Адрес {getSortArrow('address')}
      </th>
      <th onClick={() => handleSort('phone')}>
        Телефон {getSortArrow('phone')}
      </th>
      <th onClick={() => handleSort('email')}>
        Email {getSortArrow('email')}
      </th>
      <th onClick={() => handleSort('tin')}>
        ИНН {getSortArrow('tin')}
      </th>
    </tr>
  );
};

export default ReportSuppliersTableHeader;
