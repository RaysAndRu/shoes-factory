import React from 'react';
import TableHeader from './ReportClientOrdersTableHeader';
import TableRow from './ReportClientOrdersTableRow';

const ReportClientOrdersTable = ({ clientOrders, handleSort, sortConfig }) => {
  return (
    <table className="data-table">
      <thead>
        <TableHeader handleSort={handleSort} sortConfig={sortConfig} />
      </thead>
      <tbody>
        {clientOrders.map(order => (
          <TableRow key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportClientOrdersTable;
