import React from 'react';
import ReportMaterialsTableHeader from './ReportMaterialsTableHeader';
import ReportMaterialsTableRow from './ReportMaterialsTableRow';

const ReportMaterialsTable = ({ materials, sortConfig, onSort, getSortArrow }) => {
  const columns = [
    { key: 'supplier', label: 'Поставщик' },
    { key: 'title', label: 'Название' },
    { key: 'price', label: 'Цена' },
    { key: 'quantity', label: 'Количество' },
    { key: 'unitOfMeasure', label: 'Ед. измерения' },
    { key: 'supplyDate', label: 'Дата поставки' },
  ];

  return (
    <table className="data-table">
      <ReportMaterialsTableHeader columns={columns} sortConfig={sortConfig} onSort={onSort} getSortArrow={getSortArrow} />
      <tbody>
        {materials.map(material => (
          <ReportMaterialsTableRow key={material.id} material={material} />
        ))}
      </tbody>
    </table>
  );
};

export default ReportMaterialsTable;
