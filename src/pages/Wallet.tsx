import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addDays, format, isAfter, isWithinInterval, parseISO } from 'date-fns';
import { FC, useEffect, useRef, useState } from 'react';
import { useSessionStorage, useWallet } from '../hooks';
import { UpdateWalletEdit, Wallet } from '../types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { warning } from '../styles';
import { TableFilter, WalletInput, WalletNavBar } from '../components';
import { CalculationHelper, JwtHelper } from '../utils';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const WalletPage: FC = () => {
  const [editItem, setEditItem] = useState<UpdateWalletEdit | null>(null);
  const [filteredEntries, setFilteredEntries] = useState<Wallet[]>();
  const { getToken } = useSessionStorage();
  const matches = useMediaQuery('(min-width:600px)');
  const authorization = getToken() ?? '';
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const {
    deleteEntryMutation,
    entries,
    isLoading,
    sendWalletEntryMutation,
    updateEntryMutation,
    total,
  } = useWallet({ authorization });

  useEffect(() => {
    if (!filteredEntries) setFilteredEntries(entries);
  }, [entries]);

  const handleEdit = async (entry: UpdateWalletEdit) => {
    setEditItem(entry);
    descriptionInputRef.current?.focus();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEntryMutation.mutateAsync({ id, authorization });
    } catch (error) {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message, warning);
    }
  };

  const handleSearch = (text: string) => {
    if (!text) return setFilteredEntries(entries);

    const filteredArray = filteredEntries?.filter((entry) =>
      entry.description.includes(text),
    );

    setFilteredEntries(filteredArray);
  };

  const handlePeriod = (start: Date | null, end: Date | null) => {
    if (!start || !end || isAfter(start, end)) return;

    const filteredArray = entries?.filter((entry) =>
      isWithinInterval(new Date(entry.createdAt), {
        start,
        end: addDays(end, 1),
      }),
    );
    setFilteredEntries(filteredArray);
  };

  const handleDownload = async (
    initialDate: Date | null,
    endDate: Date | null,
  ) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Expenses');

    worksheet.columns = [
      { header: 'Descrição', key: 'description', width: 40 },
      { header: 'Data', key: 'date', width: 30 },
      { header: 'Método de Pagamento', key: 'paymentMethod', width: 30 },
      { header: 'Valor', key: 'value', width: 30 },
    ];

    filteredEntries?.forEach((entry) => {
      const addedRow = worksheet.addRow({
        description: entry.description,
        value: CalculationHelper.formatValue(entry.value),
        paymentMethod: entry.paymentMethod,
        date: format(parseISO(entry.createdAt), 'dd/MM/yyyy'),
      });
      const valueCell = addedRow.getCell('value');
      valueCell.font = {
        color: { argb: Number(entry.value) < 0 ? 'FFFF0000' : 'FF00FF00' },
      };
    });

    worksheet.getRow(1).font = { bold: true };

    worksheet.addRow({
      description: 'Total',
      value: CalculationHelper.formatValue(total!.toString()),
    });

    const lastRow = worksheet.lastRow!;

    lastRow.font = { bold: true };

    lastRow.getCell('value').font = {
      color: { argb: total! < 0 ? 'FFFF0000' : 'FF00FF00' },
    };
    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(
      blob,
      `${JwtHelper.getUserFirstName(authorization)}-${format(parseISO(initialDate!.toISOString()), 'dd/MM/yyyy')}-${format(parseISO(endDate!.toISOString()), 'dd/MM/yyyy')}.xlsx`,
    );
  };

  return (
    <Box>
      <WalletNavBar />
      <Box sx={{ p: 3 }}>
        <WalletInput
          editItem={editItem}
          setEditItem={setEditItem}
          descriptionInputRef={descriptionInputRef}
          sendWalletEntryMutation={sendWalletEntryMutation}
          updateEntryMutation={updateEntryMutation}
          isLoading={isLoading}
        />
        {matches && (
          <TableFilter
            handleSearch={handleSearch}
            handlePeriod={handlePeriod}
            handleDownload={handleDownload}
          />
        )}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'green' }}>
                <TableCell
                  sx={{ width: '25%', textAlign: 'center', color: 'white' }}
                >
                  <b>Descrição</b>
                </TableCell>
                <TableCell
                  sx={{ width: '15%', textAlign: 'center', color: 'white' }}
                >
                  <b>Valor</b>
                </TableCell>
                <TableCell
                  sx={{ width: '20%', textAlign: 'center', color: 'white' }}
                >
                  <b>Método de Pagamento</b>
                </TableCell>
                <TableCell
                  sx={{ width: '15%', textAlign: 'center', color: 'white' }}
                >
                  <b>Data</b>
                </TableCell>
                <TableCell
                  sx={{ width: '10%', textAlign: 'center', color: 'white' }}
                >
                  <b>Ações</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEntries?.map(
                ({ id, description, value, paymentMethod, createdAt }) => (
                  <TableRow key={id}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {description}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        color:
                          parseFloat(
                            value.replace('R$', '').replace(',', '.'),
                          ) < 0
                            ? 'red'
                            : 'green',
                      }}
                    >
                      {CalculationHelper.formatValue(value)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {paymentMethod}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {format(parseISO(createdAt), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell
                      sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
                    >
                      <IconButton
                        disabled={isLoading}
                        onClick={() =>
                          handleEdit({ id, description, value, paymentMethod })
                        }
                        id={id.toString()}
                      >
                        <EditIcon sx={{ color: 'orange' }} />
                      </IconButton>
                      <IconButton
                        disabled={isLoading}
                        onClick={() => handleDelete(id.toString())}
                        color="error"
                        id={id.toString()}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
