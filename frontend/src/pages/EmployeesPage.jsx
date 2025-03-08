import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import EmployeeSearch from '../components/EmployeeSearch';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeModal from '../components/EmployeeModal';
import ActionButton from '../components/ActionButton';
import useDebounce from '../hooks/useDebounce';
import '../assets/css/Table.css';
import '../assets/css/Modal.css';
import '../assets/css/Main.css';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [dots, setDots] = useState('');

  const [newEmployee, setNewEmployee] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    hireDate: '',
    dismissalDate: '',
    passportSeries: '',
    passportNumber: '',
    position: '',
    status: '',
  });
  
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);

  const [searchLastName, setSearchLastName] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const debouncedSearchLastName = useDebounce(searchLastName, 1000);
  const debouncedSearchStatus = useDebounce(searchStatus, 1000);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      let url = 'http://localhost:8080/api/v1/employees/all';
      if (searchLastName) {
        url = `http://localhost:8080/api/v1/employees/lastname/${searchLastName}`;
      } else if (searchStatus) {
        url = `http://localhost:8080/api/v1/employees/status/${searchStatus}`;
      }
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setEmployees(response.data);
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
        setApiError('Неизвестная ошибка.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [debouncedSearchLastName, debouncedSearchStatus]);

  useEffect(() => {
    if (apiError) {
      const interval = setInterval(() => {
        setDots(prevDots => (prevDots === '...' ? '' : prevDots + '.'));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots('');
    }
  }, [apiError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // При очистке поля устанавливаем null
    if (value === '') {
      setNewEmployee({ ...newEmployee, [name]: null });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
    setFormErrors({ ...formErrors, [name]: '' });
    setApiError(null);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lastName') {
      setSearchLastName(value);
    } else if (name === 'status') {
      setSearchStatus(value);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!newEmployee.lastName?.trim()) errors.lastName = 'Заполните фамилию';
    if (!newEmployee.firstName?.trim()) errors.firstName = 'Заполните имя';
    if (!newEmployee.dateOfBirth?.trim()) errors.dateOfBirth = 'Заполните дату рождения';
    if (!newEmployee.phone?.trim()) errors.phone = 'Заполните телефон';
    if (!newEmployee.email?.trim()) errors.email = 'Заполните email';
    if (!newEmployee.hireDate?.trim()) errors.hireDate = 'Заполните дату найма';
    if (!newEmployee.passportSeries?.trim()) errors.passportSeries = 'Заполните серию паспорта';
    if (!newEmployee.passportNumber?.trim()) errors.passportNumber = 'Заполните номер паспорта';
    if (!newEmployee.position?.trim()) errors.position = 'Заполните должность';
    if (!newEmployee.status?.trim()) errors.status = 'Заполните статус';
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormatEmployee = async () => {
    const cleanPhone = newEmployee.phone ? newEmployee.phone.replace(/[^\d+]/g, '') : '';
    // Если dismissalDate пустая, устанавливаем null
    const employeeToSend = {
      ...newEmployee,
      phone: cleanPhone,
      dismissalDate: newEmployee.dismissalDate || null,
      middleName: newEmployee.middleName || null,
    };
    return employeeToSend;
  };

  const handleCreateEmployee = async () => {
    if (!validateForm()) return;
    const employeeToSend = await handleFormatEmployee();
    try {
      await axios.post('http://localhost:8080/api/v1/employees/create', employeeToSend, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setApiError(null);
      fetchEmployees();
      closeModal();
      setNewEmployee({
        lastName: '',
        firstName: '',
        middleName: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        hireDate: '',
        dismissalDate: '',
        passportSeries: '',
        passportNumber: '',
        position: '',
        status: ''
      });
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при создании сотрудника:', error);
      if (error.response) {
        setApiError('Произошла ошибка при создании сотрудника. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleUpdateEmployee = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`http://localhost:8080/api/v1/employees/update/${employeeToUpdate.id}`, newEmployee, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setApiError(null);
      fetchEmployees();
      closeModal();
      setNewEmployee({
        lastName: '',
        firstName: '',
        middleName: '',
        dateOfBirth: '',
        phone: '',
        email: '',
        hireDate: '',
        dismissalDate: '',
        passportSeries: '',
        passportNumber: '',
        position: '',
        status: ''
      });
      setEmployeeToUpdate(null);
      setFormErrors({});
    } catch (error) {
      console.error('Ошибка при обновлении сотрудника:', error);
      if (error.response) {
        setApiError('Произошла ошибка при обновлении сотрудника. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/employees/delete/${employeeId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem("authToken")}`,
        },
      });
      setApiError(null);
      setEmployees(employees.filter(employee => employee.id !== employeeId));
    } catch (error) {
      console.error('Ошибка при удалении сотрудника:', error);
      if (error.response) {
        setApiError('Произошла ошибка при удалении сотрудника. Попробуйте еще раз.');
      } else {
        setApiError('Нет подключения к серверу.');
      }
    }
  };

  const openModal = (employee = null) => {
    if (employee) {
      setEmployeeToUpdate(employee);
      setNewEmployee(employee);
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

  if (apiError && employees.length === 0) {
    return (
      <div className="page-container">
        <Header />
        <h1 className="page-title">Сотрудники</h1>
        <EmployeeSearch
          searchLastName={searchLastName}
          searchStatus={searchStatus}
          onSearchChange={handleSearchChange}
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
      <h1 className="page-title">Сотрудники</h1>
      <EmployeeSearch
        searchLastName={searchLastName}
        searchStatus={searchStatus}
        onSearchChange={handleSearchChange}
      />
      <div className="button-container">
        <ActionButton className="create-button" onClick={() => openModal()}>
          Добавить сотрудника
        </ActionButton>
        <ActionButton
          className="report-button"
          onClick={() => (window.location.href = '/employees/report')}
        >
          Отчетная форма
        </ActionButton>
      </div>
      <EmployeeTable
        employees={employees}
        onUpdate={openModal}
        onDelete={handleDeleteEmployee}
      />
      <EmployeeModal
        show={showModal}
        employeeToUpdate={employeeToUpdate}
        newEmployee={newEmployee}
        formErrors={formErrors}
        apiError={apiError}
        dots={dots}
        onInputChange={handleInputChange}
        onConfirm={employeeToUpdate ? handleUpdateEmployee : handleCreateEmployee}
        onCancel={closeModal}
      />
    </div>
  );
};

export default EmployeesPage;
