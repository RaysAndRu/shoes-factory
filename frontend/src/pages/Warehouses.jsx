import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import WarehouseModal from '../components/WarehouseModal';
import WarehouseSearch from '../components/WarehouseSearch';
import WarehouseTable from '../components/WarehouseTable';
import useDebounce from '../hooks/useDebounce';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';
import ActionButton from '../components/ActionButton';

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [newWarehouse, setNewWarehouse] = useState({
    address: '',
    phone: '',
    productQuantity: '',
    responsibleEmployeeId: '',
  });

  const [warehouseToUpdate, setWarehouseToUpdate] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');

  const debouncedSearchPhone = useDebounce(searchPhone, 1000);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/employees/all', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке сотрудников:', error);
    }
  };

  const fetchWarehouses = async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      let url = 'http://localhost:8080/api/v1/warehouses/all';
      if (searchPhone) {
        url = `http://localhost:8080/api/v1/warehouses/phone/${searchPhone}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setWarehouses(data);
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
    fetchWarehouses();
    fetchEmployees();
  }, [debouncedSearchPhone]);

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
    setNewWarehouse({ ...newWarehouse, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setSearchPhone(value);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!newWarehouse.address.trim()) errors.address = 'Заполните адрес';
    if (!newWarehouse.phone.trim()) errors.phone = 'Заполните телефон';
    if (!String(newWarehouse.productQuantity).trim()) errors.productQuantity = 'Заполните количество продукции';
    // if (!newWarehouse.responsibleEmployeeId) errors.responsibleEmployeeId = 'Выберите ответственного сотрудника';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateWarehouse = async () => {
    if (!validateForm()) return;

    const cleanPhone = newWarehouse.phone.replace(/[^\d+]/g, '');
    const requestData = {
      responsibleEmployeeId:  Number(newWarehouse.responsibleEmployeeId) || null ,
      address: newWarehouse.address,
      phone: cleanPhone,
      productQuantity: Number(newWarehouse.productQuantity) || 0,
    };
    console.log("Отправляемые данные:", JSON.stringify(requestData, null, 2));

    try {
      await axios.post('http://localhost:8080/api/v1/warehouses/create', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      fetchWarehouses();
      closeModal();
      setNewWarehouse({
        address: '',
        phone: '',
        productQuantity: '',
        responsibleEmployeeId: '',
      });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании склада:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании склада. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateWarehouse = async () => {
    if (!validateForm()) return;

    const cleanPhone = newWarehouse.phone.replace(/[^\d+]/g, '');
    const requestData = {
      responsibleEmployeeId:  Number(newWarehouse.responsibleEmployeeId) || null ,
      address: newWarehouse.address,
      phone: cleanPhone,
      productQuantity: Number(newWarehouse.productQuantity) || 0,
    };
    console.log("Отправляемые данные:", JSON.stringify(requestData, null, 2));

    try {
      await axios.put(`http://localhost:8080/api/v1/warehouses/update/${warehouseToUpdate.id}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      fetchWarehouses();
      closeModal();
      setNewWarehouse({
        address: '',
        phone: '',
        productQuantity: '',
        responsibleEmployeeId: '',
      });
      setWarehouseToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении склада:', error);
      if (error.response) {
        setApiError('Произошла ошибка при обновлении склада. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteWarehouse = async (warehouseId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/warehouses/delete/${warehouseId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setWarehouses(warehouses.filter(warehouse => warehouse.id !== warehouseId));
    } catch (error) {
      console.error('Ошибка при удалении склада:', error);
      if (error.response) {
        setApiError('Произошла ошибка при удалении склада. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (warehouse = null) => {
    if (warehouse) {
      setWarehouseToUpdate(warehouse);
      setNewWarehouse({
        address: warehouse.address,
        phone: warehouse.phone,
        productQuantity: warehouse.productQuantity,
        responsibleEmployeeId: warehouse.responsibleEmployee ? warehouse.responsibleEmployee.id : '',
      });
    } else {
      setNewWarehouse({
        address: '',
        phone: '',
        productQuantity: '',
        responsibleEmployeeId: '',
      });
      setWarehouseToUpdate(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormErrors({});
  };

  if (apiError) {
    return (
      <div className="page-container">
        <Header />
        <h1 className="page-title">Склады</h1>
        <WarehouseSearch searchPhone={searchPhone} handleSearchChange={handleSearchChange} />
        <div className="api-error-message">
          {apiError}
          {dots}
        </div>
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
      <h1 className="page-title">Склады</h1>
      <WarehouseSearch searchPhone={searchPhone} handleSearchChange={handleSearchChange} />

      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Создать склад
        </ActionButton>
        <ActionButton className="report-button" onClick={() => (window.location.href = '/warehouses/report')}>
          Отчетная форма
        </ActionButton>
        <ActionButton className="report-button" onClick={() => (window.location.href = '/products-warehouses')}>
          Продукты
        </ActionButton>
      </div>

      <WarehouseTable
        warehouses={warehouses}
        onUpdate={openModal}
        onDelete={handleDeleteWarehouse}
      />

      <WarehouseModal
        show={showModal}
        onClose={closeModal}
        onSubmit={warehouseToUpdate ? handleUpdateWarehouse : handleCreateWarehouse}
        newWarehouse={newWarehouse}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        employees={employees}
        isUpdate={!!warehouseToUpdate}
      />
    </div>
  );
};

export default WarehousePage;
