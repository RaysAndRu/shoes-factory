import React from 'react';

const MaterialModal = ({
  show,
  onClose,
  onSubmit,
  newMaterial,
  onInputChange,
  formErrors,
  apiError,
  dots,
  materialToUpdate,
  suppliers,
  fieldLabels,
  placeholders,
}) => {
  if (!show) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{materialToUpdate ? 'Обновить материал' : 'Создать новый материал'}</h2>

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

        {['title', 'price', 'quantity', 'supplyDate'].map((field) => (
          <div className="modal-input-group" key={field}>
            <label htmlFor={field}>
              {fieldLabels[field]}:
              <span className="required-asterisk">*</span>
            </label>
            <input
              type={
                field === 'supplyDate'
                  ? 'date'
                  : (field === 'price' || field === 'quantity')
                    ? 'number'
                    : 'text'
              }
              id={field}
              name={field}
              value={newMaterial[field] || ''}
              onChange={onInputChange}
              placeholder={placeholders[field]}
              className="modal-input"
              required
            />
            {formErrors[field] && <p className="error-text">{formErrors[field]}</p>}
          </div>
        ))}

        <div className="modal-input-group">
          <label htmlFor="unitOfMeasure">
            Единица измерения:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="unitOfMeasure"
            name="unitOfMeasure"
            value={newMaterial.unitOfMeasure || ''}
            onChange={onInputChange}
            className="modal-input"
            required
          >
            <option value="">Выберите единицу измерения</option>
            <option value="тон">тон</option>
            <option value="кг">кг</option>
            <option value="г">г</option>
            <option value="л">л</option>
            <option value="шт">шт</option>
            <option value="кв.м">кв.м</option>
            <option value="м">м</option>
            <option value="мм">мм</option>
            <option value="см">см</option>
          </select>
          {formErrors.unitOfMeasure && <p className="error-text">{formErrors.unitOfMeasure}</p>}
        </div>

        <div className="modal-input-group">
          <label htmlFor="supplierId">
            Поставщик:
            <span className="required-asterisk">*</span>
          </label>
          <select
            id="supplierId"
            name="supplierId"
            value={newMaterial.supplierId || ""}
            onChange={onInputChange}
            className="modal-input"
            required
          >
            <option value="">Выберите поставщика</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.title} (ID: {supplier.id})
              </option>
            ))}
          </select>
          {formErrors.supplierId && <p className="error-text">{formErrors.supplierId}</p>}
        </div>

        <div className="modal-buttons">
          <button className="modal-confirm" onClick={onSubmit}>
            {materialToUpdate ? 'Обновить материал' : 'Создать материал'}
          </button>
          <button className="modal-cancel" onClick={onClose}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default MaterialModal;
