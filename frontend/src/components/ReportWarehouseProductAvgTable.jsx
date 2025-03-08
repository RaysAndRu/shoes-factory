import React from 'react';
import ReportWarehouseProductAvgTableHeader from './ReportWarehouseProductAvgTableHeader';
import ReportWarehouseProductAvgTableRow from './ReportWarehouseProductAvgTableRow';

const ReportWarehouseProductAvgTable = ({ warehouseAvgData, handleSort, getSortArrow }) => {
  return (
    <table className="data-table">
      <thead>
        <ReportWarehouseProductAvgTableHeader
          handleSort={handleSort}
          getSortArrow={getSortArrow}
        />
      </thead>
      <tbody>
        {warehouseAvgData.map(item => (
          <ReportWarehouseProductAvgTableRow key={item.warehouseId} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportWarehouseProductAvgTable;
