// src/components/ProductOrderSearch.js
import React from 'react';
import '../assets/css/Main.css';

const ProductOrderSearch = ({
  searchTitle,
  searchArticle,
  minPrice,
  maxPrice,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onResetPriceFilter,
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

      <div className="search-field">
        <label htmlFor="article">Артикул:</label>
        <input
          type="text"
          id="article"
          name="article"
          value={searchArticle}
          onChange={onSearchChange}
          placeholder="Поиск по артикулу"
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
            onChange={(e) => onMinPriceChange(e.target.value)}
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
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="price-range"
          />
        </div>

        <button onClick={onResetPriceFilter}>
          Сбросить фильтр
        </button>
      </div>
    </div>
  );
};

export default ProductOrderSearch;
