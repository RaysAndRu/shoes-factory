import React from 'react';

const WarehouseSearch = ({ searchPhone, handleSearchChange }) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="phone">Телефон:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={searchPhone}
          onChange={handleSearchChange}
          placeholder="Поиск по телефону"
        />
      </div>
    </div>
  );
};

export default WarehouseSearch;
