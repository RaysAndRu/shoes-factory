import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import HomePage from './pages/Home';
import ProductPage from './pages/ProductsPage';
import SuppliersPage from './pages/SuppliersPage';
import EmployeesPage from './pages/EmployeesPage';
import AuthPage from './pages/AuthPage';
import AccessDenied from './pages/AccessDenied';
import ReportClientsPage from './pages/ReportClientsPage';
import ReportEmployeesPage from './pages/ReportEmployeePage';
import ReportSuppliersPage from './pages/ReportSupplierPage';
import ReportProductsPage from './pages/ReportProductsPage';
import WarehousePage from './pages/Warehouses';
import ReportWarehousesPage from './pages/ReportWarehousePage';
import MaterialPage from './pages/MaterialsPage';
import ReportMaterialsPage from './pages/ReportMaterialPage';
import ProductionOrderPage from './pages/ProductionOrdersPage';
import ReportProductionOrdersPage from './pages/ReportProductionOrdersPage';
import ClientOrdersPage from './pages/ClientOrdersPage';
import ReportClientOrdersPage from './pages/ReportClientOrdersPage';
import ReportClientSalesPage from './pages/ReportClientSalesPage';
import ReportProductRevenuePage from './pages/ReportProductRevenuePage';
import ProductWarehousePage from './pages/ProductWarehousePage';
import ReportProductWarehousePage from './pages/ReportProductWarehousePage';
import ReportWarehouseProductAvgPage from './pages/ReportWarehouseProductAvgPage';

const MainPage = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/report" element={<ReportClientsPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/report" element={<ReportProductsPage />} />
        <Route path="/products/sales/report" element={<ReportProductRevenuePage />} />
        <Route path="/suppliers" element={<SuppliersPage />} />
        <Route path="/suppliers/report" element={<ReportSuppliersPage />} />
        <Route path="/warehouses" element={<WarehousePage />} />
        <Route path="/warehouses/report" element={<ReportWarehousesPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/report" element={<ReportEmployeesPage />} />
        <Route path="/materials" element={<MaterialPage />} />
        <Route path="/materials/report" element={<ReportMaterialsPage />} />
        <Route path="/production-orders" element={<ProductionOrderPage />} />
        <Route path="/production-orders/report" element={<ReportProductionOrdersPage />} />
        <Route path="/client-orders" element={<ClientOrdersPage />} />
        <Route path="/client-orders/report" element={<ReportClientOrdersPage />} />
        <Route path="/client-orders/sales/report" element={<ReportClientSalesPage />} />
        <Route path="/products-warehouses" element={<ProductWarehousePage />} />
        <Route path="/products-warehouses/report" element={<ReportProductWarehousePage />} />
        <Route path="/products-warehouses/avg-report" element={<ReportWarehouseProductAvgPage />} />
        <Route path="/error" element={<AccessDenied />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
};

export default MainPage;

