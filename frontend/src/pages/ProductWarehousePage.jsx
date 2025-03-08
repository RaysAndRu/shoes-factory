// src/pages/ProductWarehousePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ProductWarehouseModal from '../components/ProductWarehouseModal';
import ProductWarehouseSearch from '../components/ProductWarehouseSearch';
import ProductWarehouseTable from '../components/ProductWarehouseTable';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';
import ActionButton from '../components/ActionButton';

const ProductWarehousePage = () => {
  const [productWarehouses, setProductWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [newRecord, setNewRecord] = useState({
    warehouseId: '',
    productId: '',
    quantity: '',
  });

  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [warehouses, setWarehouses] = useState([]);
  const [products, setProducts] = useState([]);

  // Фильтр по продукту
  const [searchProductId, setSearchProductId] = useState('');

  // Получение списка складов
  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/warehouses/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem('authToken')}`,
        },
      });
      setWarehouses(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке складов:', error);
    }
  };

  // Получение списка продуктов
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/products/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem('authToken')}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  };

  // Получение списка записей складов продуктов (с учетом фильтра по продукту)
  const fetchProductWarehouses = async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      let url = '';
      if (searchProductId) {
        url = `http://localhost:8080/api/v1/product-warehouses/product/${searchProductId}`;
      } else {
        url = 'http://localhost:8080/api/v1/product-warehouses/all';
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem('authToken')}`,
        },
      });
      setProductWarehouses(response.data);
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
    fetchProductWarehouses();
    fetchWarehouses();
    fetchProducts();
  }, [searchProductId]);

  useEffect(() => {
    if (apiError) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots === '...' ? '' : prevDots + '.'));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [apiError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecord({ ...newRecord, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateForm = () => {
    let errors = {};
    if (!String(newRecord.warehouseId).trim()) errors.warehouseId = 'Выберите склад';
    if (!String(newRecord.productId).trim()) errors.productId = 'Выберите продукт';
    if (!String(newRecord.quantity).trim()) errors.quantity = 'Введите количество';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateRecord = async () => {
    if (!validateForm()) return;

    const requestData = {
      warehouseId: Number(newRecord.warehouseId),
      productId: Number(newRecord.productId),
      quantity: Number(newRecord.quantity),
    };

    try {
      await axios.post('http://localhost:8080/api/v1/product-warehouses/create', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem('authToken')}`,
        },
      });
      fetchProductWarehouses();
      closeModal();
      setNewRecord({ warehouseId: '', productId: '', quantity: '' });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateRecord = async () => {
    if (!validateForm()) return;

    const requestData = {
      warehouseId: Number(newRecord.warehouseId),
      productId: Number(newRecord.productId),
      quantity: Number(newRecord.quantity),
    };

    try {
      await axios.put(`http://localhost:8080/api/v1/product-warehouses/update/${recordToUpdate.id}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem('authToken')}`,
        },
      });
      fetchProductWarehouses();
      closeModal();
      setNewRecord({ warehouseId: '', productId: '', quantity: '' });
      setRecordToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
      if (error.response) {
        setApiError('Произошла ошибка при обновлении. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/product-warehouses/delete/${recordId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem('authToken')}`,
        },
      });
      setProductWarehouses(productWarehouses.filter((record) => record.id !== recordId));
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (record = null) => {
    if (record) {
      setRecordToUpdate(record);
      setNewRecord({
        warehouseId: record.warehouse ? record.warehouse.id : '',
        productId: record.product ? record.product.id : '',
        quantity: record.quantity,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormErrors({});
  };

  const handleConfirm = () => {
    if (recordToUpdate) {
      handleUpdateRecord();
    } else {
      handleCreateRecord();
    }
  };

  const handleSearchChange = (e) => {
    setSearchProductId(e.target.value);
  };

  if (apiError) {
    return (
      <div className="page-container">
        <Header />
        <h1 className="page-title">Записи складов продуктов</h1>
        <div className="api-error-message">{apiError}{dots}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">Записи складов продуктов</h1>

      <ProductWarehouseSearch
        searchProductId={searchProductId}
        onSearchChange={handleSearchChange}
        products={products}
      />
      
      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Создать запись
        </ActionButton>
        <ActionButton className="report-button" onClick={() => (window.location.href = '/products-warehouses/report')}>
          Отчетная форма
        </ActionButton>
        <ActionButton className="report-button" onClick={() => (window.location.href = '/products-warehouses/avg-report')}>
          Среднее количество продуктов
        </ActionButton>
      </div>

      <ProductWarehouseTable
        productWarehouses={productWarehouses}
        onUpdate={openModal}
        onDelete={handleDeleteRecord}
      />

      <ProductWarehouseModal
        visible={showModal}
        recordToUpdate={recordToUpdate}
        newRecord={newRecord}
        onInputChange={handleInputChange}
        onConfirm={handleConfirm}
        onCancel={closeModal}
        formErrors={formErrors}
        warehouses={warehouses}
        products={products}
      />
    </div>
  );
};

export default ProductWarehousePage;
