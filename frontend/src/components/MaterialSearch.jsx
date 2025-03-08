import React from 'react';

const MaterialSearch = ({
  searchTitle,
  onSearchChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onResetFilter,
}) => {
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
      <div className="price-filter-container">
        <div className="price-filter">
          <label>Минимальная цена: {minPrice}</label>
          <input
            type="range"
            min="0"
            max="10000"
            value={minPrice}
            onChange={onMinPriceChange}
            className="price-range"
          />
        </div>
        <div className="price-filter">
          <label>Максимальная цена: {maxPrice}</label>
          <input
            type="range"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={onMaxPriceChange}
            className="price-range"
          />
        </div>
        <button onClick={onResetFilter}>
          Сбросить фильтр
        </button>
      </div>
    </div>
  );
};

export default MaterialSearch;
