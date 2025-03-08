import React from 'react';

const columns = [
  { key: 'client', label: 'Клиент' },
  { key: 'product', label: 'Продукт' },
  { key: 'quantity', label: 'Количество' },
  { key: 'orderDate', label: 'Дата заказа' },
  { key: 'expectedDeliveryDate', label: 'Ожидаемая дата доставки' },
  { key: 'deliveryAddress', label: 'Адрес доставки' },
  { key: 'paymentMethod', label: 'Метод оплаты' },
  { key: 'status', label: 'Статус' }
];

const ReportClientTableHeader = ({ handleSort, sortConfig }) => {
  const getSortArrow = (column) => {
    if (sortConfig.key !== column) return '';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <tr>
      {columns.map(col => (
        <th key={col.key} onClick={() => handleSort(col.key)}>
          {col.label} {getSortArrow(col.key)}
        </th>
      ))}
    </tr>
  );
};

export default ReportClientTableHeader;
