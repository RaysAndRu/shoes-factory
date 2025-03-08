// ProductionOrdersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ProductionOrderModal from '../components/ProductionOrderModal';
import ProductionOrderSearch from '../components/ProductionOrderSearch';
import ProductionOrderTable from '../components/ProductionOrderTable';
import ActionButton from '../components/ActionButton';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';
import useDebounce from '../hooks/useDebounce';

const ProductionOrdersPage = () => {
  const [productionOrders, setProductionOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [searchStatus, setSearchStatus] = useState('');
  const debouncedSearchStatus = useDebounce(searchStatus, 1000);

  const [newOrder, setNewOrder] = useState({
    productId: '',
    quantity: '',
    plannedCompletionDate: '',
    status: '',
    actualCompletionDate: '',
  });

  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/products/all',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке продуктов:', error);
    }
  };

  const fetchProductionOrders = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      let url = 'http://localhost:8080/api/v1/production-orders/all';
      if (searchStatus) {
        url = `http://localhost:8080/api/v1/production-orders/status/${searchStatus}`;
      }
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${localStorage.getItem('authToken')}`,
        },
      });
      setProductionOrders(response.data);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setApiError('Сервис недоступен. Попробуйте позже.');
        } else if (
          error.response.status === 404 ||
          error.response.status === 400
        ) {
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
    fetchProductionOrders();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchStatus]);

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
    setNewOrder({ ...newOrder, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'status') {
      setSearchStatus(value);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!String(newOrder.productId).trim())
      errors.productId = 'Выберите продукт';
    if (!String(newOrder.quantity).trim())
      errors.quantity = 'Заполните количество';
    if (!newOrder.plannedCompletionDate)
      errors.plannedCompletionDate = 'Выберите планируемую дату завершения';
    if (!newOrder.status) errors.status = 'Выберите статус';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateOrder = async () => {
    if (!validateForm()) return;

    const requestData = {
      productId: Number(newOrder.productId) || null,
      quantity: Number(newOrder.quantity) || 0,
      plannedCompletionDate: newOrder.plannedCompletionDate,
      status: newOrder.status,
    };

    try {
      await axios.post(
        'http://localhost:8080/api/v1/production-orders/create',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${localStorage.getItem('authToken')}`,
          },
        }
      );
      fetchProductionOrders();
      closeModal();
      setNewOrder({
        productId: '',
        quantity: '',
        plannedCompletionDate: '',
        actualCompletionDate: '',
        status: '',
      });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      if (error.response) {
        setApiError(
          'Произошла ошибка при создании заказа. Попробуйте еще раз.'
        );
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateOrder = async () => {
    if (!validateForm()) return;

    const requestData = {
      productId: Number(newOrder.productId) || null,
      quantity: Number(newOrder.quantity) || 0,
      plannedCompletionDate: newOrder.plannedCompletionDate,
      actualCompletionDate: newOrder.actualCompletionDate,
      status: newOrder.status,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/v1/production-orders/update/${orderToUpdate.id}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${localStorage.getItem('authToken')}`,
          },
        }
      );
      fetchProductionOrders();
      closeModal();
      setNewOrder({
        productId: '',
        quantity: '',
        plannedCompletionDate: '',
        actualCompletionDate: '',
        status: '',
      });
      setOrderToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении заказа:', error);
      if (error.response) {
        setApiError(
          'Произошла ошибка при обновлении заказа. Попробуйте еще раз.'
        );
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/production-orders/delete/${orderId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${localStorage.getItem('authToken')}`,
          },
        }
      );
      setProductionOrders(
        productionOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error);
      if (error.response) {
        setApiError(
          'Произошла ошибка при удалении заказа. Попробуйте еще раз.'
        );
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (order = null) => {
    if (order) {
      setOrderToUpdate(order);
      setNewOrder({
        productId: order.product ? order.product.id : '',
        quantity: order.quantity,
        plannedCompletionDate: order.plannedCompletionDate,
        status: order.status,
        actualCompletionDate: order.actualCompletionDate,
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormErrors({});
  };

  const handleConfirm = () => {
    if (orderToUpdate) {
      handleUpdateOrder();
    } else {
      handleCreateOrder();
    }
  };

  if (apiError) {
    return (
      <div className="page-container">
        <Header />
        <h1 className="page-title">Заказы на производство</h1>
        <ProductionOrderSearch
          searchStatus={searchStatus}
          onSearchChange={handleSearchChange}
        />
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
      <h1 className="page-title">Заказы на производство</h1>
      <ProductionOrderSearch
        searchStatus={searchStatus}
        onSearchChange={handleSearchChange}
      />
      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Создать заказ
        </ActionButton>
        <ActionButton
          className="report-button"
          onClick={() => (window.location.href = '/production-orders/report')}
        >
          Отчетная форма
        </ActionButton>
      </div>

      <ProductionOrderTable
        productionOrders={productionOrders}
        onUpdate={openModal}
        onDelete={handleDeleteOrder}
      />

      <ProductionOrderModal
        visible={showModal}
        orderToUpdate={orderToUpdate}
        newOrder={newOrder}
        onInputChange={handleInputChange}
        onConfirm={handleConfirm}
        onCancel={closeModal}
        formErrors={formErrors}
        products={products}
      />
    </div>
  );
};

export default ProductionOrdersPage;
