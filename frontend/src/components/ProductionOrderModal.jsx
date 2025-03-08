// ProductionOrderModal.js
import React from 'react';
import '../assets/css/Modal.css';

const ProductionOrderModal = ({
  visible,
  orderToUpdate,
  newOrder,
  onInputChange,
  onConfirm,
  onCancel,
  formErrors,
  products,
}) => {
  if (!visible) return null;

  const placeholders = {
    quantity: 'Введите количество',
    plannedCompletionDate: 'Выберите планируемую дату завершения',
    status: 'Выберите статус',
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>
          &times;
        </span>
        <h2>
          {orderToUpdate
            ? 'Обновить заказ на производство'
            : 'Создать новый заказ'}
        </h2>

        {Object.keys(formErrors).length > 0 && (
          <p className="error-message">
            <span className="required-asterisk">*</span> Обязательные поля не
            заполнены
          </p>
        )}

        <div className="modal-input-group">
          <label htmlFor="productId">
            Продукт:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="productId"
            name="productId"
            value={newOrder.productId}
            onChange={onInputChange}
            className="modal-input"
          >
            <option value="">Выберите продукт</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.title}
              </option>
            ))}
          </select>
          {formErrors.productId && (
            <div className="error-text">{formErrors.productId}</div>
          )}
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
            value={newOrder.quantity}
            onChange={onInputChange}
            placeholder={placeholders.quantity}
            className={`modal-input ${
              formErrors.quantity ? 'error-border' : ''
            }`}
          />
          {formErrors.quantity && (
            <div className="error-text">{formErrors.quantity}</div>
          )}
        </div>

        <div className="modal-input-group">
          <label htmlFor="plannedCompletionDate">
            Планируемая дата завершения:
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="date"
            id="plannedCompletionDate"
            name="plannedCompletionDate"
            value={newOrder.plannedCompletionDate}
            onChange={onInputChange}
            className={`modal-input ${
              formErrors.plannedCompletionDate ? 'error-border' : ''
            }`}
          />
          {formErrors.plannedCompletionDate && (
            <div className="error-text">{formErrors.plannedCompletionDate}</div>
          )}
        </div>

        {orderToUpdate && (
          <div className="modal-input-group">
            <label htmlFor="actualCompletionDate">
              Реальная дата завершения:
            </label>
            <input
              type="date"
              id="actualCompletionDate"
              name="actualCompletionDate"
              value={newOrder.actualCompletionDate || ''}
              onChange={onInputChange}
              className="modal-input"
            />
          </div>
        )}

        <div className="modal-input-group">
          <label htmlFor="status">
            Статус:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={newOrder.status}
            onChange={onInputChange}
            className="modal-input"
          >
            <option value="">Выберите статус</option>
            <option value="В производстве">В производстве</option>
            <option value="Выполнен">Выполнен</option>
            <option value="Отменен">Отменен</option>
          </select>
          {formErrors.status && (
            <div className="error-text">{formErrors.status}</div>
          )}
        </div>

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            {orderToUpdate ? 'Обновить заказ' : 'Создать заказ'}
          </button>
          <button className="modal-cancel" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductionOrderModal;
