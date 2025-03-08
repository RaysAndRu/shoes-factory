import React from 'react';

const ReportClientSalesTableHeader = ({ onSort, sortConfig }) => {
  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <thead>
      <tr>
        <th onClick={() => onSort('clientId')}>ID клиента {getSortArrow('clientId')}</th>
        <th onClick={() => onSort('lastName')}>Фамилия {getSortArrow('lastName')}</th>
        <th onClick={() => onSort('firstName')}>Имя {getSortArrow('firstName')}</th>
        <th onClick={() => onSort('totalSpent')}>Общая сумма покупок {getSortArrow('totalSpent')}</th>
        <th onClick={() => onSort('clientRank')}>Ранг клиента {getSortArrow('clientRank')}</th>
      </tr>
    </thead>
  );
};

export default ReportClientSalesTableHeader;
