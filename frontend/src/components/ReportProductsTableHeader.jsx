import React from 'react';

const ReportProductsTableHeader = ({ handleSort, getSortArrow }) => {
  return (
    <tr>
      <th onClick={() => handleSort('title')}>Название {getSortArrow('title')}</th>
      <th onClick={() => handleSort('price')}>Цена {getSortArrow('price')}</th>
      <th onClick={() => handleSort('article')}>Артикул {getSortArrow('article')}</th>
      <th onClick={() => handleSort('size')}>Размер {getSortArrow('size')}</th>
      <th onClick={() => handleSort('color')}>Цвет {getSortArrow('color')}</th>
    </tr>
  );
};

export default ReportProductsTableHeader;
