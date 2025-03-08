import React from 'react';
import ReportClientTableHeader from './ReportClientTableHeader';
import ReportClientTableRow from './ReportClientTableRow';

const ReportClientTable = ({ clients, sortConfig, onSort }) => {
  const columns = [
    { key: 'lastName', label: 'Фамилия' },
    { key: 'firstName', label: 'Имя' },
    { key: 'middleName', label: 'Отчество' },
    { key: 'formOrganization', label: 'Организация' },
    { key: 'contactDetails', label: 'Контакты' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Телефон' },
    { key: 'type', label: 'Тип' },
  ];

  return (
    <table className="data-table">
      <ReportClientTableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} />
      <tbody>
        {clients.map(client => (
          <ReportClientTableRow key={client.id} client={client} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportClientTable;
