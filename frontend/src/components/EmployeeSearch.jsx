import React from 'react';
import '../assets/css/Main.css'; // или другой css-файл для стилизации

const EmployeeSearch = ({ searchLastName, searchStatus, onSearchChange }) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={searchLastName}
          onChange={onSearchChange}
          placeholder="Поиск по фамилии"
        />
      </div>
      <div className="search-field">
        <label htmlFor="status">Статус:</label>
        <select
          id="status"
          name="status"
          value={searchStatus}
          onChange={onSearchChange}
        >
          <option value="">Все</option>
          <option value="Работает">Работает</option>
          <option value="Уволен">Уволен</option>
          <option value="В отпуске">В отпуске</option>
          <option value="Болеет">Болеет</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeSearch;
