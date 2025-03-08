import React from 'react';

const ClientsTable = ({ clients, onUpdate, onDelete, formatPhoneNumber }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Организация</th>
            <th>Контакты</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Тип</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.lastName}</td>
              <td>{client.firstName}</td>
              <td>{client.middleName}</td>
              <td>{client.formOrganization}</td>
              <td>{client.contactDetails}</td>
              <td>{client.email}</td>
              <td>{formatPhoneNumber(client.phone)}</td>
              <td>{client.type}</td>
              <td>
                <button className="update-button" onClick={() => onUpdate(client)}>Обновить</button>
                <button className="delete-button" onClick={() => onDelete(client.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
