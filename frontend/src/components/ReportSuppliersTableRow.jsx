import React from 'react';

const ReportSuppliersTableRow = ({ supplier }) => {
  return (
    <tr>
      <td>{supplier.title}</td>
      <td>{supplier.contactDetails}</td>
      <td>{supplier.address}</td>
      <td>{supplier.phone}</td>
      <td>{supplier.email}</td>
      <td>{supplier.tin}</td>
    </tr>
  );
};

export default ReportSuppliersTableRow;
