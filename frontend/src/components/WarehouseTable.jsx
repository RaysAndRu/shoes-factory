import React from 'react';

const WarehouseTable = ({ warehouses, onUpdate, onDelete }) => {
  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length === 11 && phoneDigits.startsWith('7')) {
      return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4, 7)}-${phoneDigits.slice(7, 9)}-${phoneDigits.slice(9, 11)}`;
    }
    return phone;
  };

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Адрес</th>
            <th>Телефон</th>
            <th>Количество продукции</th>
            <th>Ответственный сотрудник</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((warehouse) => (
            <tr key={warehouse.id}>
              <td>{warehouse.id}</td>
              <td>{warehouse.address}</td>
              <td>{formatPhoneNumber(warehouse.phone)}</td>
              <td>{warehouse.productQuantity}</td>
              <td>
                {warehouse.responsibleEmployee
                  ? `${warehouse.responsibleEmployee.lastName} (ID: ${warehouse.responsibleEmployee.id})`
                  : 'Не назначен'}
              </td>
              <td>
                <button className="update-button" onClick={() => onUpdate(warehouse)}>
                  Обновить
                </button>
                <button className="delete-button" onClick={() => onDelete(warehouse.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WarehouseTable;
