import React from 'react';

const MaterialTable = ({ materials, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Единица измерения</th>
            <th>Дата поставки</th>
            <th>Поставщик</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(material => (
            <tr key={material.id}>
              <td>{material.id}</td>
              <td>{material.title}</td>
              <td>{material.price}</td>
              <td>{material.quantity}</td>
              <td>{material.unitOfMeasure}</td>
              <td>{material.supplyDate}</td>
              <td>
                {material.supplier 
                  ? `${material.supplier.title} (ID: ${material.supplier.id})` 
                  : 'Не назначен'}
              </td>
              <td>
                <button className="update-button" onClick={() => onEdit(material)}>Обновить</button>
                <button className="delete-button" onClick={() => onDelete(material.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialTable;
