import React, { useState } from 'react';
import ReportClientSalesTableHeader from './ReportClientSalesTableHeader';
import ReportClientSalesTableRow from './ReportClientSalesTableRow';

const ReportClientSalesTable = ({ clientSales }) => {
  const [sortedSales, setSortedSales] = useState(clientSales);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const handleSort = (column) => {
    let direction = 'ascending';
    if (sortConfig.key === column && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...sortedSales].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortedSales(sortedData);
    setSortConfig({ key: column, direction });
  };

  return (
    <table className="data-table">
      <ReportClientSalesTableHeader onSort={handleSort} sortConfig={sortConfig} />
      <tbody>
        {sortedSales.map((sale) => (
          <ReportClientSalesTableRow key={sale.clientId} sale={sale} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportClientSalesTable;
