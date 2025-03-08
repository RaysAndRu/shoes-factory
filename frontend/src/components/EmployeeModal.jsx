import React from 'react';
import InputMask from 'react-input-mask';
import '../assets/css/Modal.css';

const EmployeeModal = ({
  show,
  employeeToUpdate,
  newEmployee,
  formErrors,
  apiError,
  dots,
  onInputChange,
  onConfirm,
  onCancel
}) => {
  if (!show) return null;

  const fieldLabels = {
    lastName: "Фамилия",
    firstName: "Имя",
    middleName: "Отчество",
    dateOfBirth: "Дата рождения",
    phone: "Телефон",
    email: "Email",
    hireDate: "Дата найма",
    dismissalDate: "Дата увольнения",
    passportSeries: "Серия паспорта",
    passportNumber: "Номер паспорта",
    position: "Должность",
    status: "Статус"
  };

  const placeholders = {
    lastName: "Введите фамилию",
    firstName: "Введите имя",
    middleName: "Введите отчество",
    dateOfBirth: "Введите дату рождения",
    phone: "Введите телефон",
    email: "Введите email",
    hireDate: "Введите дату найма",
    dismissalDate: "Введите дату увольнения",
    passportSeries: "Введите серию паспорта",
    passportNumber: "Введите номер паспорта",
    position: "Введите должность",
    status: "Введите статус"
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>{employeeToUpdate ? 'Обновить сотрудника' : 'Добавить нового сотрудника'}</h2>

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

        {['lastName', 'firstName', 'middleName', 'email', 'position'].map((field) => (
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
              value={newEmployee[field] || ''}
              onChange={onInputChange}
              className={`modal-input ${formErrors[field] ? 'error-border' : ''}`}
            />
            {formErrors[field] && <span className="error-text">{formErrors[field]}</span>}
          </div>
        ))}

        <div className="modal-input-group">
          <label htmlFor="passportSeries">
            Серия паспорта:
            <span className="required-asterisk">*</span>
          </label>
          <InputMask
            mask="9999"
            maskChar=""
            type="text"
            id="passportSeries"
            name="passportSeries"
            value={newEmployee.passportSeries || ''}
            onChange={onInputChange}
            placeholder="Введите серию паспорта"
            className={`modal-input ${formErrors.passportSeries ? 'error-border' : ''}`}
          />
          {formErrors.passportSeries && <span className="error-text">{formErrors.passportSeries}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="passportNumber">
            Номер паспорта:
            <span className="required-asterisk">*</span>
          </label>
          <InputMask
            mask="999999"
            maskChar=""
            type="text"
            id="passportNumber"
            name="passportNumber"
            value={newEmployee.passportNumber || ''}
            onChange={onInputChange}
            placeholder="Введите номер паспорта"
            className={`modal-input ${formErrors.passportNumber ? 'error-border' : ''}`}
          />
          {formErrors.passportNumber && <span className="error-text">{formErrors.passportNumber}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="phone">
            Телефон:
            <span className="required-asterisk">*</span>
          </label>
          <InputMask
            mask="+7 (999) 999-99-99"
            id="phone"
            name="phone"
            value={newEmployee.phone || ''}
            onChange={onInputChange}
            className={`modal-input ${formErrors.phone ? 'error-border' : ''}`}
            placeholder="+7 (XXX) XXX-XX-XX"
          />
          {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="dateOfBirth">
            Дата рождения:
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={newEmployee.dateOfBirth || ''}
            onChange={onInputChange}
            className={`modal-input ${formErrors.dateOfBirth ? 'error-border' : ''}`}
          />
          {formErrors.dateOfBirth && <span className="error-text">{formErrors.dateOfBirth}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="hireDate">
            Дата найма:
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="date"
            id="hireDate"
            name="hireDate"
            value={newEmployee.hireDate || ''}
            onChange={onInputChange}
            className={`modal-input ${formErrors.hireDate ? 'error-border' : ''}`}
          />
          {formErrors.hireDate && <span className="error-text">{formErrors.hireDate}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="dismissalDate">
            Дата увольнения:
            <span className="required-asterisk">*</span>
          </label>
          <input
            type="date"
            id="dismissalDate"
            name="dismissalDate"
            value={newEmployee.dismissalDate || ''}
            onChange={onInputChange}
            className={`modal-input ${formErrors.dismissalDate ? 'error-border' : ''}`}
          />
          {formErrors.dismissalDate && <span className="error-text">{formErrors.dismissalDate}</span>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="status">
            Статус:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={newEmployee.status || ''}
            onChange={onInputChange}
            className={`modal-input ${formErrors.status ? 'error-border' : ''}`}
          >
            <option value="">Выберите статус</option>
            <option value="Работает">Работает</option>
            <option value="Уволен">Уволен</option>
            <option value="В отпуске">В отпуске</option>
            <option value="Болеет">Болеет</option>
          </select>
          {formErrors.status && <span className="error-text">{formErrors.status}</span>}
        </div>

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onConfirm}>
            {employeeToUpdate ? 'Обновить сотрудника' : 'Создать сотрудника'}
          </button>
          <button className="modal-cancel" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
