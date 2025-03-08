//Base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const CLIENTS_API = {
    GET_ALL: `${API_BASE_URL}/clients/all`,
    GET_BY_ID: (id) => `${API_BASE_URL}/clients/${id}`,
    GET_BY_ORGANIZATION: (organization) => `${API_BASE_URL}/clients/organization/${organization}`,
    GET_BY_PHONE: (phone) => `${API_BASE_URL}/clients/phone/${phone}`,
    GET_BY_TYPE: (type) => `${API_BASE_URL}/clients/type/${type}`,
    GET_BY_SALES: `${API_BASE_URL}/clients/all/sales`,
    CREATE: `${API_BASE_URL}/clients/create`,
    UPDATE: (id) => `${API_BASE_URL}/clients/update/${id}`,
    DELETE: (id) => `${API_BASE_URL}/clients/delete/${id}`,
}

//Clients
export const CLIENTS_URL = `${API_BASE_URL}/clients/all`;
export const CLIENT_SALES_URL = `${API_BASE_URL}/clients/all/sales`;
export const CLIENTS_BY_ORGANIZATION_URL =(organization) => `${API_BASE_URL}/clients/${organization}`;  
export const CLIENT_BY_PHONE_URL = (phone) => `${API_BASE_URL}/clients/${phone}`;  
export const CLIENT_BY_TYPE_URL = (type) => `${API_BASE_URL}/clients/${type}`;  
export const CREATE_CLIENT_URL = `${API_BASE_URL}/clients/create`;  
export const UPDATE_CLIENT_URL =(clientId) => `${API_BASE_URL}/clients/update/${clientId}`;  
export const DELETE_CLIENT_URL =(clientId) => `${API_BASE_URL}/clients/delete/${clientId}`;  

//Clent Orders
export const CLIENT_ORDERS_URL = `${API_BASE_URL}/client-orders/all`;
export const CLIENT_ORDERS_BY_STATUS_URL =(status) =>  `${API_BASE_URL}/client-orders/status/${status}`;
export const CREATE_CLIENT_ORDERS_URL = `${API_BASE_URL}client-orders/create`;  
export const UPDATE_CLIENT_ORDERS_URL =(clientOrderId) => `${API_BASE_URL}/client-orders/update/${clientOrderId}`;  
export const DELETE_CLIENT_ORDERS_URL =(clientOrderId) => `${API_BASE_URL}/client-orders/delete/${clientOrderId}`; 

//Employees
export const EMPLOYEES_URL = `${API_BASE_URL}/employees/all`;
export const EMPLOYEES_BY_LASTNAME_URL = (lastName) => `${API_BASE_URL}/employees/lastname/${lastName}`;
export const EMPLOYEES_BY_STATUS_URL = (status) => `${API_BASE_URL}/employees/status/${status}`;
export const CREATE_EMPLOYEE_URL = `${API_BASE_URL}/employees/create`;
export const UPDATE_EMPLOYEE_URL = (employeeId) => `${API_BASE_URL}/employees/update/${employeeId}`;
export const DELETE_EMPLOYEE_URL = (employeeId) => `${API_BASE_URL}/employees/delete/${employeeId}`;
