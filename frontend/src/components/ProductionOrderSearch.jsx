// ProductionOrderSearch.js
import React from 'react';
import '../assets/css/Main.css';

const ProductionOrderSearch = ({ searchStatus, onSearchChange }) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="status">Статус производства:</label>
        <select
          id="status"
          name="status"
          value={searchStatus}
          onChange={onSearchChange}
        >
          <option value="">Все</option>
          <option value="В производстве">В производстве</option>
          <option value="Выполнен">Выполнен</option>
          <option value="Отменен">Отменен</option>
        </select>
      </div>
    </div>
  );
};

export default ProductionOrderSearch;
