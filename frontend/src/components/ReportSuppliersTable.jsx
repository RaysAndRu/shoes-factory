import React from 'react';
import ReportSuppliersTableHeader from './ReportSuppliersTableHeader';
import ReportSuppliersTableRow from './ReportSuppliersTableRow';

const ReportSuppliersTable = ({ suppliers, handleSort, getSortArrow }) => {
  return (
    <table className="data-table">
      <thead>
        <ReportSuppliersTableHeader 
          handleSort={handleSort} 
          getSortArrow={getSortArrow} 
        />
      </thead>
      <tbody>
        {suppliers.map(supplier => (
          <ReportSuppliersTableRow key={supplier.id} supplier={supplier} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportSuppliersTable;
