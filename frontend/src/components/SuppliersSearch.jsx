// src/components/SuppliersPageSearch.js
import React from 'react';
import '../assets/css/Main.css';

const SuppliersPageSearch = ({ searchTitle, onSearchChange }) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="title">Название:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={searchTitle}
          onChange={onSearchChange}
          placeholder="Поиск по названию"
        />
      </div>
    </div>
  );
};

export default SuppliersPageSearch;
