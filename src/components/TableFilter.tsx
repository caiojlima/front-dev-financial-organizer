import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';
import { endOfMonth, startOfMonth } from 'date-fns';
import { CalculationHelper } from '../utils';
import { useSessionStorage, useWallet } from '../hooks';

type TableFilterProps = {
  handleSearch: (text: string) => void;
  handlePeriod: (start: Date | null, end: Date | null) => void;
  handleDownload: (start: Date | null, end: Date | null) => Promise<void>;
};

export const TableFilter = ({
  handleSearch,
  handlePeriod,
  handleDownload,
}: TableFilterProps) => {
  const [search, setSearch] = useState('');
  const [initialDate, setInitialDate] = useState<Date | null>(
    startOfMonth(new Date()),
  );
  const [endDate, setEndDate] = useState<Date | null>(endOfMonth(new Date()));
  const matches = useMediaQuery('(min-width:1330px)');

  const { getToken } = useSessionStorage();

  const authorization = getToken() ?? '';

  const { total } = useWallet({ authorization });

  const handleInputChange = (text: string) => {
    handleSearch(text);
    setSearch(text);
  };

  useEffect(() => {
    handlePeriod(initialDate, endDate);
  }, [initialDate, endDate]);

  const getTotalLabel = () =>
    `Total: ${total ? CalculationHelper.formatValue(total.toString()) : 0}`;

  return (
    <Box
      mb={1}
      display={'flex'}
      justifyContent={'flex-start'}
      alignItems={'center'}
    >
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
          format="dd/MM/yyyy"
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          sx={{ marginRight: 3 }}
          label="Data Final"
          value={endDate}
          onChange={(selectedDate) => setEndDate(selectedDate)}
          format="dd/MM/yyyy"
        />
      </LocalizationProvider>
      {matches && (
        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadForOfflineOutlinedIcon />}
          onClick={() => handleDownload(initialDate, endDate)}
        >
          DOWNLOAD EXCEL
        </Button>
      )}
      <Typography
        variant="h6"
        sx={{
          color: total && total < 0 ? 'red' : 'green',
          fontWeight: 'bold',
          textAlign: 'right',
          flex: 1,
        }}
      >
        {getTotalLabel()}
      </Typography>
    </Box>
  );
};
