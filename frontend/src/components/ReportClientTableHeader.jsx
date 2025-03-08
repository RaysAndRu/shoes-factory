import React from 'react';

const ReportClientTableHeader = ({ columns, sortConfig, onSort }) => {
  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col.key} onClick={() => onSort(col.key)}>
            {col.label} {getSortArrow(col.key)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ReportClientTableHeader;
