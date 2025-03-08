import React from 'react';

const ReportMaterialsTableHeader = ({ columns, sortConfig, onSort, getSortArrow }) => {
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

export default ReportMaterialsTableHeader;
