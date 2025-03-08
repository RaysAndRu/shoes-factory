// src/components/ProductWarehouseModal.js
import React from 'react';
import '../assets/css/Modal.css';

const ProductWarehouseModal = ({
  visible,
  recordToUpdate,
  newRecord,
  onInputChange,
  onConfirm,
  onCancel,
  formErrors,
  warehouses,
  products,
}) => {
  if (!visible) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>{recordToUpdate ? 'Обновить запись' : 'Создать новую запись'}</h2>

        {Object.keys(formErrors).length > 0 && (
          <p className="error-message">
            <span className="required-asterisk">*</span> Обязательные поля не заполнены
          </p>
        )}

        <div className="modal-input-group">
          <label htmlFor="warehouseId">
            Склад:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="warehouseId"
            name="warehouseId"
            value={newRecord.warehouseId}
            onChange={onInputChange}
            className="modal-input"
          >
            <option value="">Выберите склад</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.address} (ID {warehouse.id})
              </option>
            ))}
          </select>
          {formErrors.warehouseId && <div className="error-text">{formErrors.warehouseId}</div>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="productId">
            Продукт:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="productId"
            name="productId"
            value={newRecord.productId}
            onChange={onInputChange}
            className="modal-input"
          >
            <option value="">Выберите продукт</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title} (ID: {product.id})
              </option>
            ))}
          </select>
          {formErrors.productId && <div className="error-text">{formErrors.productId}</div>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="quantity">
            Количество:
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={newRecord.quantity}
            onChange={onInputChange}
            placeholder="Введите количество"
            className={`modal-input ${formErrors.quantity ? 'error-border' : ''}`}
          />
          {formErrors.quantity && <div className="error-text">{formErrors.quantity}</div>}
        </div>

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            {recordToUpdate ? 'Обновить запись' : 'Создать запись'}
          </button>
          <button className="modal-cancel" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default ProductWarehouseModal;
