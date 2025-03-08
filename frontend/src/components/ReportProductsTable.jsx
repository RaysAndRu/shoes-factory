import React from 'react';
import ReportProductsTableHeader from './ReportProductsTableHeader';
import ReportProductsTableRow from './ReportProductsTableRow';

const ReportProductsTable = ({ products, handleSort, getSortArrow }) => {
  return (
    <table className="data-table">
      <thead>
        <ReportProductsTableHeader handleSort={handleSort} getSortArrow={getSortArrow} />
      </thead>
      <tbody>
        {products.map(product => (
          <ReportProductsTableRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportProductsTable;
