import React from 'react';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  onGlobalFilterChange
}) {
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

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Global Search</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              variant="outlined"
              value={globalFilter ?? ''}
              onChange={(e) => onGlobalFilterChange(e.target.value)}
              placeholder="Search all columns..."
            />
          </AccordionDetails>
        </Accordion>

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
      </Box>
    </Drawer>
  );
}

export default SidePanel;