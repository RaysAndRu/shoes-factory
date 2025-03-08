import React from 'react';

const ExportButton = ({ clientOrders }) => {
  const exportToCSV = () => {
    const header = ['Клиент', 'Продукт', 'Количество', 'Дата заказа', 'Ожидаемая дата доставки', 'Адрес доставки', 'Метод оплаты', 'Статус'];
    const rows = clientOrders.map(order => [
      order.client ? order.client.name : 'Неизвестно',
      order.product ? order.product.title : 'Неизвестно',
      order.quantity,
      order.orderDate ? new Date(order.orderDate).toLocaleString() : '',
      order.expectedDeliveryDate ? new Date(order.expectedDeliveryDate).toLocaleDateString() : '',
      order.deliveryAddress,
      order.paymentMethod,
      order.status,
    ]);

    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'report.csv';
    link.click();
  };

  return <button className="create-button" onClick={exportToCSV}>Экспорт в CSV</button>;
};

export default ExportButton;
