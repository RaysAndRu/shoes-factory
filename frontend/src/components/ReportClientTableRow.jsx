import React from 'react';

const ReportClientTableRow = ({ client }) => {
  return (
    <tr>
      <td>{client.lastName}</td>
      <td>{client.firstName}</td>
      <td>{client.middleName}</td>
      <td>{client.formOrganization}</td>
      <td>{client.contactDetails}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>{client.type}</td>
    </tr>
  );
};

export default ReportClientTableRow;
