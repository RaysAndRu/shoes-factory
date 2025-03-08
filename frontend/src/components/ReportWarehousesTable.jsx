import React from 'react';
import ReportWarehousesTableHeader from './ReportWarehousesTableHeader';
import ReportWarehousesTableRow from './ReportWarehousesTableRow';

const ReportWarehousesTable = ({ warehouses, handleSort, getSortArrow }) => {
  return (
    <table className="data-table">
      <thead>
        <ReportWarehousesTableHeader
          handleSort={handleSort}
          getSortArrow={getSortArrow}
        />
      </thead>
      <tbody>
        {warehouses.map(warehouse => (
          <ReportWarehousesTableRow key={warehouse.id} warehouse={warehouse} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportWarehousesTable;
