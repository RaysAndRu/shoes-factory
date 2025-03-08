// src/pages/SuppliersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SuppliersPageModal from '../components/SuppliersModal';
import SuppliersPageSearch from '../components/SuppliersSearch';
import SuppliersPageTable from '../components/SuppliersTable';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';
import useDebounce from '../hooks/useDebounce';
import ActionButton from '../components/ActionButton';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [newSupplier, setNewSupplier] = useState({
    title: '',
    contactDetails: '',
    address: '',
    phone: '',
    email: '',
    tin: '',
  });

  const [supplierToUpdate, setSupplierToUpdate] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');

  const debouncedSearchTitle = useDebounce(searchTitle, 1000);

  const fetchSuppliers = async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      let url = 'http://localhost:8080/api/v1/suppliers/all';
      if (searchTitle) {
        url = `http://localhost:8080/api/v1/suppliers/title/${searchTitle}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });

      setSuppliers(response.data);
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
    fetchSuppliers();
  }, [debouncedSearchTitle]);

  useEffect(() => {
    if (apiError) {
      const interval = setInterval(() => {
        setDots((prev) => (prev === '...' ? '' : prev + '.'));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [apiError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setSearchTitle(value);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!newSupplier.title.trim()) errors.title = 'Заполните название';
    if (!newSupplier.contactDetails.trim()) errors.contactDetails = 'Заполните контактные данные';
    if (!newSupplier.address.trim()) errors.address = 'Заполните адрес';
    if (!newSupplier.phone.trim()) errors.phone = 'Заполните телефон';
    if (!newSupplier.email.trim()) errors.email = 'Заполните email';
    if (!newSupplier.tin.trim()) errors.tin = 'Заполните ИНН';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateSupplier = async () => {
    if (!validateForm()) return;
    const cleanPhone = newSupplier.phone.replace(/[^\d+]/g, '');
    const supplierToSend = { ...newSupplier, phone: cleanPhone };

    try {
      await axios.post('http://localhost:8080/api/v1/suppliers/create', supplierToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      fetchSuppliers();
      closeModal();
      setNewSupplier({
        title: '',
        contactDetails: '',
        address: '',
        phone: '',
        email: '',
        tin: '',
      });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании поставщика:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании поставщика. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateSupplier = async () => {
    if (!validateForm()) return;
    const cleanPhone = newSupplier.phone.replace(/[^\d+]/g, '');
    const supplierToSend = { ...newSupplier, phone: cleanPhone };

    try {
      await axios.put(`http://localhost:8080/api/v1/suppliers/update/${supplierToUpdate.id}`, supplierToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      fetchSuppliers();
      closeModal();
      setNewSupplier({
        title: '',
        contactDetails: '',
        address: '',
        phone: '',
        email: '',
        tin: '',
      });
      setSupplierToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении поставщика:', error);
      if (error.response) {
        setApiError('Произошла ошибка при обновлении поставщика. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/suppliers/delete/${supplierId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
    } catch (error) {
      console.error('Ошибка при удалении поставщика:', error);
      if (error.response) {
        setApiError('Произошла ошибка при удалении поставщика. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (supplier = null) => {
    if (supplier) {
      setSupplierToUpdate(supplier);
      setNewSupplier(supplier);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormErrors({});
  };

  const handleConfirm = () => {
    if (supplierToUpdate) {
      handleUpdateSupplier();
    } else {
      handleCreateSupplier();
    }
  };

  // Функция форматирования номера телефона (как в исходном коде)
  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length === 11) {
      return `+7 (${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 8)}-${phoneDigits.slice(8, 10)}`;
    }
    return phone;
  };

  if (apiError) {
    return (
      <div className="page-container">
        <Header />
        <h1 className="page-title">Поставщики</h1>
        <SuppliersPageSearch searchTitle={searchTitle} onSearchChange={handleSearchChange} />
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
      <h1 className="page-title">Поставщики</h1>
      <SuppliersPageSearch searchTitle={searchTitle} onSearchChange={handleSearchChange} />
      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Создать поставщика
        </ActionButton>
        <ActionButton className="report-button" onClick={() => window.location.href = '/suppliers/report'}>
          Отчетная форма
        </ActionButton>
      </div>
      <SuppliersPageTable
        suppliers={suppliers}
        onUpdate={openModal}
        onDelete={handleDeleteSupplier}
        formatPhoneNumber={formatPhoneNumber}
      />
      <SuppliersPageModal
        visible={showModal}
        supplierToUpdate={supplierToUpdate}
        newSupplier={newSupplier}
        onInputChange={handleInputChange}
        onConfirm={handleConfirm}
        onCancel={closeModal}
        formErrors={formErrors}
      />
    </div>
  );
};

export default SuppliersPage;
