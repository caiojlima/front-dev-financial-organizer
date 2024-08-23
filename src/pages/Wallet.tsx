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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, parseISO } from 'date-fns';
import { FC, useRef, useState } from 'react';
import { useSessionStorage, useWallet } from '../hooks';
import { UpdateWalletEdit } from '../types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { warning } from '../styles';
import { WalletInput } from '../components';
import { CalculationHelper } from '../utils';

export const WalletPage: FC = () => {
  const [editItem, setEditItem] = useState<UpdateWalletEdit | null>(null);
  const { getToken } = useSessionStorage();
  const authorization = getToken() ?? '';
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const {
    deleteEntryMutation,
    entries,
    isLoading,
    sendWalletEntryMutation,
    updateEntryMutation,
  } = useWallet({ authorization });

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

  return (
    <Box sx={{ p: 3 }}>
      <WalletInput
        editItem={editItem}
        setEditItem={setEditItem}
        descriptionInputRef={descriptionInputRef}
        sendWalletEntryMutation={sendWalletEntryMutation}
        updateEntryMutation={updateEntryMutation}
        isLoading={isLoading}
      />
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '25%', textAlign: 'center' }}>
                <b>Descrição</b>
              </TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center' }}>
                <b>Valor</b>
              </TableCell>
              <TableCell sx={{ width: '20%', textAlign: 'center' }}>
                <b>Método de Pagamento</b>
              </TableCell>
              <TableCell sx={{ width: '15%', textAlign: 'center' }}>
                <b>Data</b>
              </TableCell>
              <TableCell sx={{ width: '10%', textAlign: 'center' }}>
                <b>Ações</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries?.map(
              ({ id, description, value, paymentMethod, createdAt }) => (
                <TableRow key={id}>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {description}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: 'center',
                      color:
                        parseFloat(value.replace('R$', '').replace(',', '.')) <
                        0
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
  );
};
