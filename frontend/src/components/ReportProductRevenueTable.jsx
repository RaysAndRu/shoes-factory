import React from 'react';
import ReportProductRevenueTableHeader from './ReportProductRevenueTableHeader';
import ReportProductRevenueTableRow from './ReportProductRevenueTableRow';

const ReportProductRevenueTable = ({ productRevenue, sortConfig, onSort, getSortArrow }) => {
  const columns = [
    { key: 'productId', label: 'ID продукта' },
    { key: 'productName', label: 'Название продукта' },
    { key: 'totalRevenue', label: 'Общая выручка' },
  ];

  return (
    <table className="data-table">
      <ReportProductRevenueTableHeader
        columns={columns}
        onSort={onSort}
        getSortArrow={getSortArrow}
      />
      <tbody>
        {productRevenue.map(product => (
          <ReportProductRevenueTableRow key={product.productId} product={product} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportProductRevenueTable;
