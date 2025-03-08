import React from 'react';

const OrderSearch = ({ searchStatus, handleSearchChange }) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="status">Статус заказа:</label>
        <select
          id="status"
          name="status"
          value={searchStatus}
          onChange={handleSearchChange}
        >
          <option value="">Все</option>
          <option value="Новый">Новый</option>
          <option value="В процессе">В процессе</option>
          <option value="Выполнен">Выполнен</option>
          <option value="Отменен">Отменен</option>
          <option value="В доставке">В доставке</option>
        </select>
      </div>
    </div>
  );
};

export default OrderSearch;
