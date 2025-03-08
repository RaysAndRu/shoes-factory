import React from 'react';

const ReportClientSalesTableRow = ({ sale }) => {
  return (
    <tr>
      <td>{sale.clientId}</td>
      <td>{sale.lastName}</td>
      <td>{sale.firstName}</td>
      <td>{sale.totalSpent.toFixed(2)}</td>
      <td>{sale.clientRank}</td>
    </tr>
  );
};

export default ReportClientSalesTableRow;
