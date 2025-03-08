import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import OrderSearch from '../components/ClientOrderSearch';
import OrdersTable from '../components/ClientOrdersTable';
import OrderModal from '../components/ClientOrderModal';
import ActionButton from '../components/ActionButton';
import useDebounce from '../hooks/useDebounce';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';

const ClientOrdersPage = () => {
  const [clientOrders, setClientOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [searchStatus, setSearchStatus] = useState('');
  const debouncedSearchStatus = useDebounce(searchStatus, 1000);

  const [newOrder, setNewOrder] = useState({
    clientId: '',
    productId: '',
    quantity: '',
    expectedDeliveryDate: '',
    deliveryAddress: '',
    paymentMethod: '',
    status: '',
  });

  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);

 
  const authHeader = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${localStorage.getItem("authToken")}`,
  };


  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/clients/all', {
        headers: authHeader,
      });
      setClients(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке клиентов:', error);
    }
  };


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/products/all', {
        headers: authHeader,
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  };


  const fetchClientOrders = async () => {
    try {
      setIsLoading(true);
      setApiError(null);

      let url = 'http://localhost:8080/api/v1/client-orders/all';
      if (searchStatus) {
        url = `http://localhost:8080/api/v1/client-orders/status/${searchStatus}`;
      }

      const response = await axios.get(url, {
        headers: authHeader,
      });
      setClientOrders(response.data);
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
    fetchClientOrders();
    fetchProducts();
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchStatus]);

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
    setNewOrder({ ...newOrder, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
    setApiError(null);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'status') {
      setSearchStatus(value);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!String(newOrder.clientId).trim()) errors.clientId = 'Выберите клиента';
    if (!String(newOrder.productId).trim()) errors.productId = 'Выберите продукт';
    if (!String(newOrder.quantity).trim()) errors.quantity = 'Заполните количество';
    if (!newOrder.expectedDeliveryDate) errors.expectedDeliveryDate = 'Выберите ожидаемую дату доставки';
    if (!String(newOrder.deliveryAddress).trim()) errors.deliveryAddress = 'Укажите адрес доставки';
    if (!newOrder.paymentMethod) errors.paymentMethod = 'Выберите способ оплаты';
    if (!newOrder.status) errors.status = 'Выберите статус';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateOrder = async () => {
    if (!validateForm()) return;

    const requestData = {
      clientId: newOrder.clientId || null,
      productId: newOrder.productId || null,
      quantity: Number(newOrder.quantity) || 0,
      expectedDeliveryDate: newOrder.expectedDeliveryDate,
      deliveryAddress: newOrder.deliveryAddress,
      paymentMethod: newOrder.paymentMethod,
      status: newOrder.status,
    };

    try {
      await axios.post('http://localhost:8080/api/v1/client-orders/create', requestData, {
        headers: authHeader,
      });
      setApiError(null);
      fetchClientOrders();
      closeModal();
      setNewOrder({
        clientId: '',
        productId: '',
        quantity: '',
        expectedDeliveryDate: '',
        deliveryAddress: '',
        paymentMethod: '',
        status: '',
      });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании заказа клиента:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании заказа клиента. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateOrder = async () => {
    if (!validateForm()) return;

    const requestData = {
      id: orderToUpdate.id,
      clientId: newOrder.clientId || null,
      productId: newOrder.productId || null,
      quantity: Number(newOrder.quantity) || 0,
      expectedDeliveryDate: newOrder.expectedDeliveryDate,
      deliveryAddress: newOrder.deliveryAddress,
      paymentMethod: newOrder.paymentMethod,
      status: newOrder.status,
    };

    try {
      await axios.put(`http://localhost:8080/api/v1/client-orders/update/${orderToUpdate.id}`, requestData, {
        headers: authHeader,
      });
      setApiError(null);
      fetchClientOrders();
      closeModal();
      setNewOrder({
        clientId: '',
        productId: '',
        quantity: '',
        expectedDeliveryDate: '',
        deliveryAddress: '',
        paymentMethod: '',
        status: '',
      });
      setOrderToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении заказа клиента:', error);
      if (error.response) {
        setApiError('Произошла ошибка при обновлении заказа клиента. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/client-orders/delete/${orderId}`, {
        headers: authHeader,
      });
      setApiError(null);
      setClientOrders(clientOrders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error('Ошибка при удалении заказа клиента:', error);
      if (error.response) {
        setApiError('Произошла ошибка при удалении заказа клиента. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (order = null) => {
    if (order) {
      setOrderToUpdate(order);
      setNewOrder({
        clientId: order.client ? order.client.id : '',
        productId: order.product ? order.product.id : '',
        quantity: order.quantity,
        expectedDeliveryDate: order.expectedDeliveryDate,
        deliveryAddress: order.deliveryAddress,
        paymentMethod: order.paymentMethod,
        status: order.status,
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
    setOrderToUpdate(null);
  };

  if (apiError && !clientOrders.length) {
    return (
      <div className="page-container">
        <Header />
        <h1 className="page-title">Заказы клиентов</h1>
        <OrderSearch searchStatus={searchStatus} handleSearchChange={handleSearchChange} />
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
      <h1 className="page-title">Заказы клиентов</h1>
      <OrderSearch searchStatus={searchStatus} handleSearchChange={handleSearchChange} />

      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Создать заказ
        </ActionButton>
        <ActionButton className="report-button" onClick={() => window.location.href = '/client-orders/report'}>
          Отчетная форма
        </ActionButton>
        <ActionButton className="report-button" onClick={() => window.location.href = '/client-orders/sales/report'}>
          Отчетная форма продаж
        </ActionButton>
      </div>

      <OrdersTable
        orders={clientOrders}
        onUpdate={openModal}
        onDelete={handleDeleteOrder}
      />

      {showModal && (
        <OrderModal
          newOrder={newOrder}
          formErrors={formErrors}
          apiError={apiError}
          dots={dots}
          clients={clients}
          products={products}
          handleInputChange={handleInputChange}
          onConfirm={orderToUpdate ? handleUpdateOrder : handleCreateOrder}
          onCancel={closeModal}
          isUpdate={!!orderToUpdate}
        />
      )}
    </div>
  );
};

export default ClientOrdersPage;
