import React from 'react';

const OrderModal = ({
  newOrder,
  formErrors,
  apiError,
  dots,
  clients,
  products,
  handleInputChange,
  onConfirm,
  onCancel,
  isUpdate,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>{isUpdate ? 'Обновить заказ клиента' : 'Создать новый заказ'}</h2>

        {Object.keys(formErrors).length > 0 && (
          <p className="error-message">
            <span className="required-asterisk">*</span> Обязательные поля не заполнены
          </p>
        )}

        {apiError && (
          <div className="error-message">
            {apiError}{dots}
          </div>
        )}

        <div className="modal-input-group">
          <label htmlFor="clientId">
            Клиент:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="clientId"
            name="clientId"
            value={newOrder.clientId}
            onChange={handleInputChange}
            className="modal-input"
          >
            <option value="">Выберите клиента</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.formOrganization} ({client.id})
              </option>
            ))}
          </select>
          {formErrors.clientId && <div className="error-text">{formErrors.clientId}</div>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="productId">
            Продукт:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="productId"
            name="productId"
            value={newOrder.productId}
            onChange={handleInputChange}
            className="modal-input"
          >
            <option value="">Выберите продукт</option>
            {products.map(product => (
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
            value={newOrder.quantity}
            onChange={handleInputChange}
            placeholder="Введите количество"
            className={`modal-input ${formErrors.quantity ? 'error-border' : ''}`}
          />
          {formErrors.quantity && <div className="error-text">{formErrors.quantity}</div>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="expectedDeliveryDate">
            Ожидаемая дата доставки:
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="date"
            id="expectedDeliveryDate"
            name="expectedDeliveryDate"
            value={newOrder.expectedDeliveryDate}
            onChange={handleInputChange}
            className={`modal-input ${formErrors.expectedDeliveryDate ? 'error-border' : ''}`}
          />
          {formErrors.expectedDeliveryDate && <div className="error-text">{formErrors.expectedDeliveryDate}</div>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="deliveryAddress">
            Адрес доставки:
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            value={newOrder.deliveryAddress}
            onChange={handleInputChange}
            placeholder="Введите адрес доставки"
            className={`modal-input ${formErrors.deliveryAddress ? 'error-border' : ''}`}
          />
          {formErrors.deliveryAddress && <div className="error-text">{formErrors.deliveryAddress}</div>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="paymentMethod">
            Способ оплаты:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={newOrder.paymentMethod}
            onChange={handleInputChange}
            className="modal-input"
          >
            <option value="">Выберите способ оплаты</option>
            <option value="Наличные">Наличные</option>
            <option value="Банковская карта">Банковская карта</option>
            <option value="Перевод">Перевод</option>
            <option value="СБП">СБП</option>
          </select>
          {formErrors.paymentMethod && <div className="error-text">{formErrors.paymentMethod}</div>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="status">
            Статус:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={newOrder.status}
            onChange={handleInputChange}
            className="modal-input"
          >
            <option value="">Выберите статус</option>
            <option value="Новый">Новый</option>
            <option value="В процессе">В процессе</option>
            <option value="Выполнен">Выполнен</option>
            <option value="Отменен">Отменен</option>
            <option value="В доставке">В доставке</option>
          </select>
          {formErrors.status && <div className="error-text">{formErrors.status}</div>}
        </div>

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            {isUpdate ? 'Обновить заказ' : 'Создать заказ'}
          </button>
          <button className="modal-cancel" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
