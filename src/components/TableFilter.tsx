import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type TableFilterProps = {
  handleSearch: (text: string) => void;
  handlePeriod: (start: Date | null, end: Date | null) => void;
};

export const TableFilter = ({
  handleSearch,
  handlePeriod,
}: TableFilterProps) => {
  const [search, setSearch] = useState('');
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleInputChange = (text: string) => {
    handleSearch(text);
    setSearch(text);
  };

  useEffect(() => {
    handlePeriod(initialDate, endDate);
  }, [initialDate, endDate]);

  return (
    <Box mb={1}>
      <TextField
        sx={{ marginRight: 4, width: '35%' }}
        label="Pesquisar..."
        variant="outlined"
        type="text"
        name="search"
        value={search}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          sx={{ marginRight: 1 }}
          label="Data Inicial"
          value={initialDate}
          onChange={(selectedDate) => setInitialDate(selectedDate)}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Data Final"
          value={endDate}
          onChange={(selectedDate) => setEndDate(selectedDate)}
        />
      </LocalizationProvider>
    </Box>
  );
};
