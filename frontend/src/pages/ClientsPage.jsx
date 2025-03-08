import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ClientSearch from '../components/ClientSearch';
import ClientsTable from '../components/ClientsTable';
import ClientModal from '../components/ClientModal';
import useDebounce from '../hooks/useDebounce';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';
import ActionButton from '../components/ActionButton';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [newClient, setNewClient] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    formOrganization: '',
    contactDetails: '',
    email: '',
    phone: '',
    type: '',
  });

  const [clientToUpdate, setClientToUpdate] = useState(null);

  const [searchFormOrganization, setSearchFormOrganization] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [searchType, setSearchType] = useState('');

  const debouncedSearchFormOrganization = useDebounce(searchFormOrganization, 1000);
  const debouncedSearchPhone = useDebounce(searchPhone, 1000);
  const debouncedSearchType = useDebounce(searchType, 1000);

  // Заголовки для авторизации запросов
  const authHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${localStorage.getItem("authToken")}`,
  };

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      let url = 'http://localhost:8080/api/v1/clients/all';
      if (searchFormOrganization) {
        url = `http://localhost:8080/api/v1/clients/organization/${searchFormOrganization}`;
      } else if (searchPhone) {
        url = `http://localhost:8080/api/v1/clients/phone/${searchPhone}`;
      } else if (searchType) {
        url = `http://localhost:8080/api/v1/clients/type/${searchType}`;
      }

      const response = await axios.get(url, { headers: authHeader });
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setClients(data);
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
    fetchClients();
  }, [debouncedSearchFormOrganization, debouncedSearchPhone, debouncedSearchType]);

  // Если возникает ошибка, добавляем анимацию точек
  useEffect(() => {
    if (apiError) {
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots === '...' ? '' : prevDots + '.'));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots('');
    }
  }, [apiError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Если значение пустое, сохраняем как null
    if (value === '') {
      setNewClient({ ...newClient, [name]: null });
    } else {
      setNewClient({ ...newClient, [name]: value });
    }
    setFormErrors({ ...formErrors, [name]: '' });
    setApiError(null);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'formOrganization') {
      setSearchFormOrganization(value);
    } else if (name === 'phone') {
      setSearchPhone(value);
    } else if (name === 'type') {
      setSearchType(value);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!newClient.lastName || !newClient.lastName.trim()) errors.lastName = 'Заполните фамилию';
    if (!newClient.firstName || !newClient.firstName.trim()) errors.firstName = 'Заполните имя';
    if (!newClient.formOrganization || !newClient.formOrganization.trim())
      errors.formOrganization = 'Заполните организацию клиента';
    if (!newClient.contactDetails || !newClient.contactDetails.trim())
      errors.contactDetails = 'Заполните контактные данные';
    if (!newClient.email || !newClient.email.trim()) errors.email = 'Заполните email';
    if (!newClient.phone || !newClient.phone.trim()) errors.phone = 'Заполните телефон';
    if (!newClient.type || !newClient.type.trim()) errors.type = 'Выберите тип клиента';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateClient = async () => {
    if (!validateForm()) return;
    // Очистка номера телефона: оставляем только цифры и знак +
    const cleanPhone = newClient.phone ? newClient.phone.replace(/[^\d+]/g, '') : '';
    const clientToSend = { ...newClient, phone: cleanPhone };

    try {
      await axios.post('http://localhost:8080/api/v1/clients/create', clientToSend, { headers: authHeader });
      setApiError(null);
      fetchClients();
      closeModal();
      setNewClient({
        lastName: '',
        firstName: '',
        middleName: '',
        formOrganization: '',
        contactDetails: '',
        email: '',
        phone: '',
        type: '',
      });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании клиента:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании клиента. Попробуйте позже.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateClient = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`http://localhost:8080/api/v1/clients/update/${clientToUpdate.id}`, newClient, { headers: authHeader });
      setApiError(null);
      fetchClients();
      closeModal();
      setNewClient({
        lastName: '',
        firstName: '',
        middleName: '',
        formOrganization: '',
        contactDetails: '',
        email: '',
        phone: '',
        type: '',
      });
      setClientToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении клиента:', error);
      if (error.response) {
        setApiError('Произошла ошибка при обновлении клиента. Попробуйте позже.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/clients/delete/${clientId}`, { headers: authHeader });
      setApiError(null);
      setClients(clients.filter(client => client.id !== clientId));
    } catch (error) {
      console.error('Ошибка при удалении клиента:', error);
      if (error.response) {
        setApiError('Произошла ошибка при удалении клиента. Попробуйте позже.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (client = null) => {
    if (client) {
      setClientToUpdate(client);
      setNewClient(client);
    }
    setApiError(null);
    setFormErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormErrors({});
    setApiError(null);
    setClientToUpdate(null);
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length === 11 && phoneDigits.startsWith('7')) {
      return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4, 7)}-${phoneDigits.slice(7, 9)}-${phoneDigits.slice(9, 11)}`;
    }
    return phone;
  };

  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">Клиенты</h1>

      {/* Вывод ошибки (если есть) */}
      {apiError && (
        <div className="api-error-message">
          {apiError}{dots}
        </div>
      )}

      <ClientSearch
        searchFormOrganization={searchFormOrganization}
        searchPhone={searchPhone}
        searchType={searchType}
        handleSearchChange={handleSearchChange}
      />

      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Создать клиента
        </ActionButton>
        <ActionButton className="report-button" onClick={() => window.location.href = '/clients/report'}>
          Отчетная форма
        </ActionButton>
      </div>

      {isLoading ? (
        <div className="loading-container"><div className="loader"></div></div>
      ) : (
        <ClientsTable
          clients={clients}
          onUpdate={openModal}
          onDelete={handleDeleteClient}
          formatPhoneNumber={formatPhoneNumber}
        />
      )}

      {showModal && (
        <ClientModal
          newClient={newClient}
          formErrors={formErrors}
          apiError={apiError}
          dots={dots}
          handleInputChange={handleInputChange}
          onConfirm={clientToUpdate ? handleUpdateClient : handleCreateClient}
          onCancel={closeModal}
          isUpdate={!!clientToUpdate}
        />
      )}
    </div>
  );
};

export default ClientsPage;
