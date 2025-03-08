import React from 'react';

const ReportProductsTableRow = ({ product }) => {
  return (
    <tr>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.article}</td>
      <td>{product.size}</td>
      <td>{product.color}</td>
    </tr>
  );
};

export default ReportProductsTableRow;
