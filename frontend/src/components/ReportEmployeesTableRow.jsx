import React from 'react';

const ReportEmployeesTableRow = ({ employee }) => {
  return (
    <tr>
      <td>{employee.lastName}</td>
      <td>{employee.firstName}</td>
      <td>{employee.middleName}</td>
      <td>{employee.dateOfBirth}</td>
      <td>{employee.phone}</td>
      <td>{employee.email}</td>
      <td>{employee.hireDate}</td>
      <td>{employee.dismissalDate}</td>
      <td>{employee.passportSeries}</td>
      <td>{employee.passportNumber}</td>
      <td>{employee.position}</td>
      <td>{employee.status}</td>
    </tr>
  );
};

export default ReportEmployeesTableRow;
