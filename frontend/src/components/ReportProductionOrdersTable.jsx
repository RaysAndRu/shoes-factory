import React from 'react';
import ReportProductionOrdersTableHeader from '../components/ReportProductionOrdersTableHeader';
import ReportProductionOrdersTableRow from '../components/ReportProductionOrdersTableRow';

const ReportProductionOrdersTable = ({ productionOrders, sortConfig, onSort, getSortArrow }) => {
  const columns = [
    { key: 'product', label: 'Продукт' },
    { key: 'quantity', label: 'Количество' },
    { key: 'orderDate', label: 'Дата заказа' },
    { key: 'plannedCompletionDate', label: 'Запланированная дата завершения' },
    { key: 'actualCompletionDate', label: 'Реальная дата завершения' },
    { key: 'status', label: 'Статус' },
  ];

  return (
    <table className="data-table">
      <ReportProductionOrdersTableHeader 
        columns={columns} 
        sortConfig={sortConfig} 
        onSort={onSort} 
        getSortArrow={getSortArrow} 
      />
      <tbody>
        {productionOrders.map(order => (
          <ReportProductionOrdersTableRow key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportProductionOrdersTable;
