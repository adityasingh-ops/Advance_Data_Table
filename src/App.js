import React, { useState, useMemo } from 'react';
import DataTable from './components/DataTable';
import sampleData from './data/sample-data.json';
import './App.css';
import SidePanel from './components/SidePanel';
import { Button } from '@mui/material';

function App() {
  const [data] = useState(sampleData);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  const columns = useMemo(() => [
    {
      id: 'name',
      header: 'Name',
      accessorKey: 'name',
      show: true,
    },
    {
      id: 'category',
      header: 'Category',
      accessorKey: 'category',
      show: true,
    },
    {
      id: 'subcategory',
      header: 'Subcategory',
      accessorKey: 'subcategory',
      show: true,
    },
    {
      id: 'createdAt',
      header: 'Created At',
      accessorKey: 'createdAt',
      show: true,
    },
    {
      id: 'updatedAt',
      header: 'Updated At',
      accessorKey: 'updatedAt',
      show: true,
    },
    {
      id: 'price',
      header: 'Price',
      accessorKey: 'price',
      show: true,
    },
    {
      id: 'salePrice',
      header: 'Sale Price',
      accessorKey: 'sale_price',
      show: true,
    },
  ], []);

  const [visibleColumns, setVisibleColumns] = useState(columns.map(col => col.id));
  const [sorting, setSorting] = useState([]);
  const [grouping, setGrouping] = useState([]);
  const [filters, setFilters] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const handleColumnVisibilityChange = (columnId) => {
    setVisibleColumns(prev => 
      prev.includes(columnId) ? prev.filter(id => id !== columnId) : [...prev, columnId]
    );
  };

  const handleSortingChange = (sortingState) => {
    setSorting(sortingState);
  };

  const handleGroupingChange = (groupingState) => {
    setGrouping(groupingState);
  };

  const handleFilterChange = (columnId, filterValue) => {
    setFilters(prev => ({
      ...prev,
      [columnId]: filterValue,
    }));
  };

  const handleGlobalFilterChange = (value) => {
    setGlobalFilter(value);
  };

  return (
    <div className="main-content">
      <h1>Advance Data Table </h1>
      <DataTable 
        columns={columns.filter(col => visibleColumns.includes(col.id))} 
        data={data}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        grouping={grouping}
        onGroupingChange={handleGroupingChange}
        filters={filters}
        globalFilter={globalFilter}
      />
      <SidePanel 
        open={sidePanelOpen} 
        onClose={() => setSidePanelOpen(false)} 
        columns={columns}
        visibleColumns={visibleColumns}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        grouping={grouping}
        onGroupingChange={handleGroupingChange}
        filters={filters}
        onFilterChange={handleFilterChange}
        globalFilter={globalFilter}
        onGlobalFilterChange={handleGlobalFilterChange}
      />
      <Button onClick={() => setSidePanelOpen(true)}>Filter→</Button>
    </div>
  );
}

export default App;
