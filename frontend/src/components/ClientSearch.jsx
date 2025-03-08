import React from 'react';

const ClientSearch = ({ searchFormOrganization, searchPhone, searchType, handleSearchChange }) => {
  return (
    <div className="search-container">
      <div className="search-field">
        <label htmlFor="formOrganization">Организация:</label>
        <input
          type="text"
          id="formOrganization"
          name="formOrganization"
          value={searchFormOrganization}
          onChange={handleSearchChange}
          placeholder="Поиск по организации"
        />
      </div>

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

      <div className="search-field">
        <label htmlFor="type">Тип клиента:</label>
        <select
          id="type"
          name="type"
          value={searchType}
          onChange={handleSearchChange}
        >
          <option value="">Все</option>
          <option value="Физлицо">Физическое лицо</option>
          <option value="Юрлицо">Юридическое лицо</option>
        </select>
      </div>
    </div>
  );
};

export default ClientSearch;
