import React from 'react';

const ReportProductRevenueTableRow = ({ product }) => {
  return (
    <tr>
      <td>{product.productId}</td>
      <td>{product.productName}</td>
      <td>{product.totalRevenue.toFixed(2)}</td>
    </tr>
  );
};

export default ReportProductRevenueTableRow;
