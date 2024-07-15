import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Switch,
  Slider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
function SidePanel({
  open,
  onClose,
  columns,
  visibleColumns,
  onColumnVisibilityChange,
  sorting,
  onSortingChange,
  grouping,
  onGroupingChange,
  filters,
  onFilterChange,
  globalFilter,
  onGlobalFilterChange,
  dateRange,
  onDateRangeChange,
  priceRange,
  onPriceRangeChange
}) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handlePriceRangeChange = (event, newValue) => {
    setLocalPriceRange(newValue);
  };

  const handlePriceRangeChangeCommitted = (event, newValue) => {
    onPriceRangeChange(newValue);
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: "400px" }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Table Controls
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Column Visibility</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {columns.map(column => (
                <ListItem key={column.id} dense>
                  <Switch
                    edge="start"
                    checked={visibleColumns.includes(column.id)}
                    onChange={() => onColumnVisibilityChange(column.id)}
                  />
                  <ListItemText primary={column.header} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Sorting</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sorting[0]?.id || ''}
                onChange={(e) => onSortingChange([{ id: e.target.value, desc: false }])}
              >
                <MenuItem value="">None</MenuItem>
                {columns.map(column => (
                  <MenuItem key={column.id} value={column.id}>
                    {column.header}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Grouping</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth>
              <InputLabel>Group By</InputLabel>
              <Select
                value={grouping[0]?.id || ''}
                onChange={(e) => onGroupingChange(e.target.value ? [{ id: e.target.value }] : [])}
              >
                <MenuItem value="">None</MenuItem>
                {columns.map(column => (
                  <MenuItem key={column.id} value={column.id}>
                    {column.header}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Filters</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {columns.map(column => (
              <TextField
                key={column.id}
                label={column.header}
                value={filters[column.id] || ''}
                onChange={(e) => onFilterChange(column.id, e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Date Range</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={dateRange.start}
                onChange={(newValue) => onDateRangeChange({ ...dateRange, start: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
              <DatePicker
                label="End Date"
                value={dateRange.end}
                onChange={(newValue) => onDateRangeChange({ ...dateRange, end: newValue })}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Price Range</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography id="price-range-slider" gutterBottom>
              Price Range: ${localPriceRange[0]} - ${localPriceRange[1]}
            </Typography>
            <Slider
              value={localPriceRange}
              onChange={handlePriceRangeChange}
              onChangeCommitted={handlePriceRangeChangeCommitted}
              valueLabelDisplay="auto"
              aria-labelledby="price-range-slider"
              min={0}
              max={1000} // Adjust this based on your actual price range
              sx={{ mt: 2 }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Drawer>
  );
}

export default SidePanel;
