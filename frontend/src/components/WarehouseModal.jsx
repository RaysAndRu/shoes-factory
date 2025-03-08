import React from 'react';
import InputMask from 'react-input-mask';

const WarehouseModal = ({
  show,
  onClose,
  onSubmit,
  newWarehouse,
  formErrors,
  handleInputChange,
  employees,
  isUpdate,
}) => {
  if (!show) return null;

  const fieldLabels = {
    address: "Адрес",
    productQuantity: "Количество продукции",
  };

  const placeholders = {
    address: "Введите адрес",
    productQuantity: "Введите количество продукции",
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{isUpdate ? 'Обновить склад' : 'Создать новый склад'}</h2>

        {Object.keys(formErrors).length > 0 && (
          <p className="error-message">
            <span className="required-asterisk">*</span> Обязательные поля не заполнены
          </p>
        )}

        {['address', 'productQuantity'].map((field) => (
          <div className="modal-input-group" key={field}>
            <label htmlFor={field}>
              {fieldLabels[field]}:
              <span className="required-asterisk">*</span>
            </label>
            <input
              type={field === 'productQuantity' ? 'number' : 'text'}
              id={field}
              name={field}
              placeholder={placeholders[field]}
              value={newWarehouse[field]}
              onChange={handleInputChange}
              className={`modal-input ${formErrors[field] ? 'error-border' : ''}`}
            />
            {formErrors[field] && <div className="error-text">{formErrors[field]}</div>}
          </div>
        ))}

        <div className="modal-input-group">
          <label htmlFor="phone">Телефон:</label>
          <InputMask
            mask="+7 (999) 999-99-99"
            id="phone"
            name="phone"
            value={newWarehouse.phone}
            onChange={handleInputChange}
            placeholder="Введите телефон"
            className="modal-input"
          />
          {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="responsibleEmployeeId">
            Ответственный сотрудник:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="responsibleEmployeeId"
            name="responsibleEmployeeId"
            value={newWarehouse.responsibleEmployeeId}
            onChange={handleInputChange}
            className="modal-input"
          >
            <option value="">Выберите сотрудника</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.lastName} {employee.firstName} {employee.middleName} (ID: {employee.id})
              </option>
            ))}
          </select>
          {formErrors.responsibleEmployeeId && (
            <div className="error-text">{formErrors.responsibleEmployeeId}</div>
          )}
        </div>

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onSubmit}>
            {isUpdate ? 'Обновить склад' : 'Создать склад'}
          </button>
          <button className="modal-cancel" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseModal;
