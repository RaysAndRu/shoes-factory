import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import MaterialModal from '../components/MaterialModal';
import MaterialSearch from '../components/MaterialSearch';
import MaterialTable from '../components/MaterialTable';
import ActionButton from '../components/ActionButton';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';
import useDebounce from '../hooks/useDebounce';

const MaterialPage = () => {
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    price: '',
    quantity: '',
    unitOfMeasure: '',
    supplyDate: '',
    supplierId: null,
  });

  const fieldLabels = {
    title: "Название материала",
    price: "Цена",
    quantity: "Количество",
    unitOfMeasure: "Единица измерения",
    supplyDate: "Дата поставки"
  };

  const placeholders = {
    title: "Введите название материала",
    price: "Введите цену",
    quantity: "Введите количество",
    unitOfMeasure: "Введите единицу измерения",
    supplyDate: "Введите дату поставки"
  };

  const [materialToUpdate, setMaterialToUpdate] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  const debouncedSearchTitle = useDebounce(searchTitle, 1000);
  const debouncedMinPrice = useDebounce(minPrice, 1500);
  const debouncedMaxPrice = useDebounce(maxPrice, 1500);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/suppliers/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setSuppliers(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке поставщиков:', error);
    }
  };

  const fetchMaterials = async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      let url = 'http://localhost:8080/api/v1/materials/all';

      if (searchTitle) {
        url = `http://localhost:8080/api/v1/materials/title/${searchTitle}`;
      } else if (minPrice || maxPrice) {
        url = `http://localhost:8080/api/v1/materials/price-range/${minPrice || 0}/${maxPrice || 10000}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setMaterials(data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setApiError('Сервис недоступен. Попробуйте позже.');
        } else if (error.response.status === 404 || error.response.status === 400) {
          setApiError('Проверьте данные и попробуйте снова.');
        } else {
          setApiError('Произошла ошибка при загрузке данных.');
        }
      } else {
        setApiError('Нет подключения к серверу.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchSuppliers();
  }, [debouncedSearchTitle, debouncedMinPrice, debouncedMaxPrice]);

  useEffect(() => {
    if (apiError) {
      const interval = setInterval(() => {
        setDots(prev => (prev === '...' ? '' : prev + '.'));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots('');
    }
  }, [apiError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
    setApiError(null);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setSearchTitle(value);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!newMaterial.title.trim()) errors.title = 'Заполните название материала';
    if (!String(newMaterial.price).trim()) errors.price = 'Заполните цену';
    if (!String(newMaterial.quantity).trim()) errors.quantity = 'Заполните количество';
    if (!newMaterial.unitOfMeasure.trim()) errors.unitOfMeasure = 'Заполните единицу измерения';
    if (!newMaterial.supplyDate.trim()) errors.supplyDate = 'Заполните дату поставки';
    if (!newMaterial.supplierId) errors.supplierId = 'Выберите поставщика';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateMaterial = async () => {
    if (!validateForm()) return;

    const requestData = {
      supplier: { id: Number(newMaterial.supplierId) || null },
      title: newMaterial.title,
      price: Number(newMaterial.price) || 0,
      quantity: Number(newMaterial.quantity) || 0,
      unitOfMeasure: newMaterial.unitOfMeasure,
      supplyDate: newMaterial.supplyDate
    };
    console.log("Отправляемые данные:", JSON.stringify(requestData, null, 2));

    try {
      await axios.post('http://localhost:8080/api/v1/materials/create', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setApiError(null);
      fetchMaterials();
      closeModal();
      setNewMaterial({
        title: '',
        price: '',
        quantity: '',
        unitOfMeasure: '',
        supplyDate: '',
        supplierId: null,
      });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании материала:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании материала. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateMaterial = async () => {
    if (!validateForm()) return;

    const requestData = {
      id: materialToUpdate.id,
      supplier: { id: Number(newMaterial.supplierId) || null },
      title: newMaterial.title,
      price: Number(newMaterial.price) || 0,
      quantity: Number(newMaterial.quantity) || 0,
      unitOfMeasure: newMaterial.unitOfMeasure,
      supplyDate: newMaterial.supplyDate
    };
    console.log("Отправляемые данные:", JSON.stringify(requestData, null, 2));
    try {
      await axios.put(`http://localhost:8080/api/v1/materials/update/${materialToUpdate.id}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setApiError(null);
      fetchMaterials();
      closeModal();
      setNewMaterial({
        title: '',
        price: '',
        quantity: '',
        unitOfMeasure: '',
        supplyDate: '',
        supplierId: null,
      });
      setMaterialToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении материала:', error);
      if (error.response) {
        setApiError('Произошла ошибка при обновлении материала. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/materials/delete/${materialId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setApiError(null);
      setMaterials(materials.filter(material => material.id !== materialId));
    } catch (error) {
      console.error('Ошибка при удалении материала:', error);
      if (error.response) {
        setApiError('Произошла ошибка при удалении материала. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (material = null) => {
    if (material) {
      setMaterialToUpdate(material);
      setNewMaterial({
        title: material.title,
        price: material.price,
        quantity: material.quantity,
        unitOfMeasure: material.unitOfMeasure,
        supplyDate: material.supplyDate,
        supplierId: material.supplier ? material.supplier.id : null,
      });
    }
    setApiError(null);
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormErrors({});
    setApiError(null);
  };

  if (apiError && !materials.length) {
    return (
      <div className="page-container">
        <Header />
        <h1 className="page-title">Материалы</h1>
        <MaterialSearch
          searchTitle={searchTitle}
          onSearchChange={handleSearchChange}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={(e) => setMinPrice(e.target.value)}
          onMaxPriceChange={(e) => setMaxPrice(e.target.value)}
          onResetFilter={() => { setMinPrice(0); setMaxPrice(10000); }}
        />
        <div className="api-error-message">{apiError}{dots}</div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="loading-container"><div className="loader"></div></div>;
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">Материалы</h1>
      <MaterialSearch
        searchTitle={searchTitle}
        onSearchChange={handleSearchChange}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={(e) => setMinPrice(e.target.value)}
        onMaxPriceChange={(e) => setMaxPrice(e.target.value)}
        onResetFilter={() => { setMinPrice(0); setMaxPrice(10000); }}
      />

      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Создать материал
        </ActionButton>
        <ActionButton
          className="report-button"
          onClick={() => (window.location.href = '/materials/report')}
        >
          Отчетная форма
        </ActionButton>
      </div>

      <MaterialTable
        materials={materials}
        onEdit={openModal}
        onDelete={handleDeleteMaterial}
      />

      <MaterialModal
        show={showModal}
        onClose={closeModal}
        onSubmit={materialToUpdate ? handleUpdateMaterial : handleCreateMaterial}
        newMaterial={newMaterial}
        onInputChange={handleInputChange}
        formErrors={formErrors}
        apiError={apiError}
        dots={dots}
        materialToUpdate={materialToUpdate}
        suppliers={suppliers}
        fieldLabels={fieldLabels}
        placeholders={placeholders}
      />
    </div>
  );
};

export default MaterialPage;
