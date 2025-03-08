import React from 'react';
import InputMask from 'react-input-mask';

const ClientModal = ({
  newClient,
  formErrors,
  apiError,
  dots,
  handleInputChange,
  onConfirm,
  onCancel,
  isUpdate
}) => {
  // Для удобства можно задать подписи полей и placeholder'ы
  const fieldLabels = {
    lastName: "Фамилия",
    firstName: "Имя",
    middleName: "Отчество",
    formOrganization: "Организация",
    contactDetails: "Контактные данные",
    email: "Email"
  };

  const placeholders = {
    lastName: "Введите фамилию",
    firstName: "Введите имя",
    middleName: "Введите отчество",
    formOrganization: "Введите форму организации",
    contactDetails: "Введите контактные данные",
    email: "Введите email"
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>{isUpdate ? 'Обновить клиента' : 'Создать нового клиента'}</h2>

        {/* Если произошла ошибка при операции, выводим её */}
        {apiError && (
          <div className="error-message">
            {apiError}{dots}
          </div>
        )}

        {['lastName', 'firstName', 'middleName', 'formOrganization', 'contactDetails', 'email'].map((field) => (
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
              value={newClient[field] || ''}
              onChange={handleInputChange}
              className={`modal-input ${formErrors[field] ? 'error-border' : ''}`}
            />
            {formErrors[field] && <span className="error-text">{formErrors[field]}</span>}
          </div>
        ))}

        <div className="modal-input-group">
          <label htmlFor="phone">
            Телефон:
            <span className="required-asterisk">*</span>
          </label>
          <InputMask
            mask="+7 (999) 999-99-99"
            id="phone"
            name="phone"
            value={newClient.phone || ''}
            onChange={handleInputChange}
            className={`modal-input ${formErrors.phone ? 'error-border' : ''}`}
            placeholder="+7 (XXX) XXX-XX-XX"
          />
          {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="type">
            Тип клиента:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={newClient.type || ''}
            onChange={handleInputChange}
            className={`modal-input ${formErrors.type ? 'error-border' : ''}`}
          >
            <option value="">Выберите тип</option>
            <option value="Физлицо">Физическое лицо</option>
            <option value="Юрлицо">Юридическое лицо</option>
          </select>
          {formErrors.type && <span className="error-text">{formErrors.type}</span>}
        </div>

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            {isUpdate ? 'Обновить клиента' : 'Создать клиента'}
          </button>
          <button className="modal-cancel" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default ClientModal;
