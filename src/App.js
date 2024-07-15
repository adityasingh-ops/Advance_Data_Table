import React, { useState, useMemo } from 'react';
import DataTable from './components/DataTable';
import sampleData from './data/sample-data.json';
import './App.css';
import SidePanel from './components/SidePanel';
import { Button } from '@mui/material';
import dayjs from 'dayjs';

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
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [priceRange, setPriceRange] = useState([0, 1000]); 
  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };

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

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const filteredData = useMemo(() => {
    let filtered = data;
  
    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(item => {
        const createdAt = dayjs(item.createdAt);
        return createdAt.isAfter(dateRange.start) && createdAt.isBefore(dateRange.end);
      });
    }
  
    // Apply price range filter
    filtered = filtered.filter(item => {
      const price = parseFloat(item.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });
  
    // Apply column filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(item => 
          String(item[key]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });
  
    // Apply global filter
    if (globalFilter) {
      filtered = filtered.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }
  
    // Apply grouping
    if (grouping.length > 0) {
      const groupedData = [];
      const groups = {};
  
      filtered.forEach(item => {
        const groupKey = grouping.map(g => item[g.id]).join('|');
        if (!groups[groupKey]) {
          groups[groupKey] = {
            id: `group-${groupKey}`,
            isGrouped: true,
            values: grouping.map(g => ({ id: g.id, value: item[g.id] })),
            subRows: []
          };
          groupedData.push(groups[groupKey]);
        }
        groups[groupKey].subRows.push(item);
      });
  
      filtered = groupedData.flatMap(group => [group, ...group.subRows]);
    }
  
    return filtered;
  }, [data, filters, globalFilter, dateRange, priceRange, grouping]);

  return (
    <div className="main-content">
      <h1>Advanced Data Table</h1>
      <DataTable 
        columns={columns.filter(col => visibleColumns.includes(col.id))} 
        data={filteredData}
        sorting={sorting}
        onSortingChange={handleSortingChange}
        grouping={grouping}
        onGroupingChange={handleGroupingChange}
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
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        priceRange={priceRange}
        onPriceRangeChange={handlePriceRangeChange}
      />
      <Button onClick={() => setSidePanelOpen(true)}>Filter→</Button>
    </div>
  );
}

export default App;
