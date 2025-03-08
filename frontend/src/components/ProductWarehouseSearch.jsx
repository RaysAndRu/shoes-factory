// src/components/ProductWarehouseSearch.js
import React from 'react';
import '../assets/css/Main.css';

const ProductWarehouseSearch = ({ searchProductId, onSearchChange, products }) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="searchProduct">Поиск по продукту:</label>
        <select
          id="searchProduct"
          name="searchProduct"
          value={searchProductId}
          onChange={onSearchChange}
        >
          <option value="">Все продукты</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.title} (ID: {product.id})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductWarehouseSearch;
