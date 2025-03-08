import React from 'react';
import ReportProductWarehouseTableHeader from './ReportProductWarehouseTableHeader';
import ReportProductWarehouseTableRow from './ReportProductWarehouseTableRow';

const ReportProductWarehouseTable = ({ productWarehouses, handleSort, getSortArrow }) => {
  return (
    <table className="data-table">
      <thead>
        <ReportProductWarehouseTableHeader 
          handleSort={handleSort} 
          getSortArrow={getSortArrow} 
        />
      </thead>
      <tbody>
        {productWarehouses.map(item => (
          <ReportProductWarehouseTableRow key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportProductWarehouseTable;
