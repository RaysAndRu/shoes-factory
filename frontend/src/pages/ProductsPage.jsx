// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import ProductOrderModal from '../components/ProductOrderModal';
import ProductOrderSearch from '../components/ProductOrderSearch';
import ProductOrderTable from '../components/ProductOrderTable';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';
import useDebounce from '../hooks/useDebounce';
import ActionButton from '../components/ActionButton';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    article: '',
    size: '',
    color: '',
  });

  const [productToUpdate, setProductToUpdate] = useState(null);

  const [searchTitle, setSearchTitle] = useState('');
  const [searchArticle, setSearchArticle] = useState('');

  const debouncedSearchTitle = useDebounce(searchTitle, 1000);
  const debouncedSearchArticle = useDebounce(searchArticle, 1000);
  const debouncedMinPrice = useDebounce(minPrice, 1500);
  const debouncedMaxPrice = useDebounce(maxPrice, 1500);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      let url = 'http://localhost:8080/api/v1/products/all';

      if (searchTitle) {
        url = `http://localhost:8080/api/v1/products/title/${searchTitle}`;
      } else if (searchArticle) {
        url = `http://localhost:8080/api/v1/products/article/${searchArticle}`;
      } else if (minPrice || maxPrice) {
        url = `http://localhost:8080/api/v1/products/price-range/${minPrice || 0}/${maxPrice || 10000}`;
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(response.data);
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
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTitle, debouncedSearchArticle, debouncedMinPrice, debouncedMaxPrice]);

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
    // Если поле пустое — устанавливаем null, иначе само значение
    if (value === '') {
      setNewProduct({ ...newProduct, [name]: null });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setSearchTitle(value);
    } else if (name === 'article') {
      setSearchArticle(value);
    }
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const handleResetPriceFilter = () => {
    setMinPrice(0);
    setMaxPrice(10000);
  };

  const validateForm = () => {
    let errors = {};
    if (!newProduct.title || !newProduct.title.trim()) errors.title = 'Заполните название';
    if (!newProduct.price || !String(newProduct.price).trim()) errors.price = 'Заполните цену';
    if (!newProduct.article || !newProduct.article.trim()) errors.article = 'Заполните артикул';
    if (!newProduct.size || !String(newProduct.size).trim()) errors.size = 'Заполните размер';
    if (!newProduct.color || !newProduct.color.trim()) errors.color = 'Заполните цвет';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateProduct = async () => {
    if (!validateForm()) return;
    try {
      await axios.post('http://localhost:8080/api/v1/products/create', newProduct, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      fetchProducts();
      closeModal();
      setNewProduct({
        title: '',
        price: '',
        article: '',
        size: '',
        color: '',
      });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании продукта:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании продукта. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateProduct = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`http://localhost:8080/api/v1/products/update/${productToUpdate.id}`, newProduct, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      fetchProducts();
      closeModal();
      setNewProduct({
        title: '',
        price: '',
        article: '',
        size: '',
        color: '',
      });
      setProductToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении продукта:', error);
      if (error.response) {
        setApiError('Произошла ошибка при обновлении продукта. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/delete/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error);
      if (error.response) {
        setApiError('Произошла ошибка при удалении продукта. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setProductToUpdate(product);
      setNewProduct(product);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormErrors({});
  };

  const handleConfirm = () => {
    if (productToUpdate) {
      handleUpdateProduct();
    } else {
      handleCreateProduct();
    }
  };

  if (apiError) {
    return (
      <div className="page-container">
        <Header />
        <h1 className="page-title">Продукты</h1>
        <ProductOrderSearch
          searchTitle={searchTitle}
          searchArticle={searchArticle}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onSearchChange={handleSearchChange}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
          onResetPriceFilter={handleResetPriceFilter}
        />
        <div className="api-error-message">
          {apiError}{dots}
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
      <h1 className="page-title">Продукты</h1>

      <ProductOrderSearch
        searchTitle={searchTitle}
        searchArticle={searchArticle}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSearchChange={handleSearchChange}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
        onResetPriceFilter={handleResetPriceFilter}
      />

      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Создать продукт
        </ActionButton>
        <ActionButton className="report-button" onClick={() => window.location.href = '/products/report'}>
          Отчетная форма
        </ActionButton>
        <ActionButton className="report-button" onClick={() => window.location.href = '/products/sales/report'}>
          Отчетная форма продаж
        </ActionButton>
      </div>

      <ProductOrderTable
        products={products}
        onUpdate={openModal}
        onDelete={handleDeleteProduct}
      />

      <ProductOrderModal
        visible={showModal}
        productToUpdate={productToUpdate}
        newProduct={newProduct}
        onInputChange={handleInputChange}
        onConfirm={handleConfirm}
        onCancel={closeModal}
        formErrors={formErrors}
      />
    </div>
  );
};

export default ProductsPage;
