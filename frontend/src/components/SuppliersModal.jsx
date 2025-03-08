// src/components/SuppliersPageModal.js
import React from 'react';
import InputMask from 'react-input-mask';
import '../assets/css/Modal.css';

const SuppliersPageModal = ({
  visible,
  supplierToUpdate,
  newSupplier,
  onInputChange,
  onConfirm,
  onCancel,
  formErrors,
}) => {
  if (!visible) return null;

  const fieldLabels = {
    title: "Название",
    contactDetails: "Контактные данные",
    address: "Адрес",
    phone: "Телефон",
    email: "Email",
    tin: "ИНН",
  };

  const placeholders = {
    title: "Введите название",
    contactDetails: "Введите контактные данные",
    address: "Введите адрес",
    phone: "Введите телефон",
    email: "Введите email",
    tin: "Введите ИНН",
  };

  // Определяем маску для ИНН: если введено 10 или больше символов – 12-значная маска, иначе 10-значная
  const tinMask =
    newSupplier.tin && newSupplier.tin.length >= 10
      ? "999999999999"
      : "9999999999";

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>{supplierToUpdate ? 'Обновить поставщика' : 'Создать нового поставщика'}</h2>

        {Object.keys(formErrors).length > 0 && (
          <p className="error-message">
            <span className="required-asterisk">*</span> Обязательные поля не заполнены
          </p>
        )}

        {['title', 'contactDetails', 'address', 'email'].map((field) => (
          <div className="modal-input-group" key={field}>
            <label htmlFor={field}>
              {fieldLabels[field]}:
              <span className="required-asterisk">*</span>
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              name={field}
              placeholder={placeholders[field]}
              value={newSupplier[field] || ''}
              onChange={onInputChange}
              className="modal-input"
            />
            {formErrors[field] && <span className="error-text">{formErrors[field]}</span>}
          </div>
        ))}

        <div className="modal-input-group">
          <label htmlFor="phone">Телефон:</label>
          <InputMask
            mask="+7 (999) 999-99-99"
            id="phone"
            name="phone"
            value={newSupplier.phone || ''}
            onChange={onInputChange}
            placeholder={placeholders.phone}
            className="modal-input"
          />
          {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="tin">ИНН:</label>
          <InputMask
            mask={tinMask}
            id="tin"
            name="tin"
            value={newSupplier.tin || ''}
            onChange={onInputChange}
            placeholder={placeholders.tin}
            className="modal-input"
          />
          {formErrors.tin && <span className="error-text">{formErrors.tin}</span>}
        </div>

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            {supplierToUpdate ? 'Обновить поставщика' : 'Создать поставщика'}
          </button>
          <button className="modal-cancel" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default SuppliersPageModal;
