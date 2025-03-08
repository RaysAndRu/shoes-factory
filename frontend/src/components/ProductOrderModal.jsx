// src/components/ProductOrderModal.js
import React from 'react';
import '../assets/css/Modal.css';

const ProductOrderModal = ({
  visible,
  productToUpdate,
  newProduct,
  onInputChange,
  onConfirm,
  onCancel,
  formErrors,
}) => {
  if (!visible) return null;

  const fieldLabels = {
    title: "Название",
    price: "Цена",
    article: "Артикул",
    size: "Размер",
    color: "Цвет",
  };

  const placeholders = {
    title: "Введите название продукта",
    price: "Введите цену",
    article: "Введите артикул",
    size: "Введите размер",
    color: "Введите цвет",
  };

  const fields = ['title', 'price', 'article', 'size', 'color'];

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>{productToUpdate ? 'Обновить продукт' : 'Создать новый продукт'}</h2>

        {Object.keys(formErrors).length > 0 && (
          <p className="error-message">
            <span className="required-asterisk">*</span> Обязательные поля не заполнены
          </p>
        )}

        {fields.map(field => (
          <div className="modal-input-group" key={field}>
            <label htmlFor={field}>
              {fieldLabels[field]}:
              <span className="required-asterisk">*</span>
            </label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              id={field}
              name={field}
              placeholder={placeholders[field]}
              value={newProduct[field] || ''}
              onChange={onInputChange}
              className={`modal-input ${formErrors[field] ? 'error-border' : ''}`}
            />
            {formErrors[field] && <span className="error-text">{formErrors[field]}</span>}
          </div>
        ))}

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            {productToUpdate ? 'Обновить продукт' : 'Создать продукт'}
          </button>
          <button className="modal-cancel" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default ProductOrderModal;
