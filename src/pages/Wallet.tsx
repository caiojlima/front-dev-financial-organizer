import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format, parseISO } from 'date-fns';
import { WalletFormInput, walletSchema } from '../schemas';
import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useSessionStorage, useWallet } from '../hooks';
import { UpdateWalletEdit } from '../types';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { warning } from '../styles';
import { getErrorMessage } from '../utils';

export const WalletPage: FC = () => {
  const [editItem, setEditItem] = useState<UpdateWalletEdit | null>(null);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<WalletFormInput>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      description: '',
      value: '',
      paymentMethod: '',
    },
  });

  const descriptionInputRef = useRef<HTMLInputElement>(null);

  const { getToken } = useSessionStorage();

  const authorization = getToken() ?? '';

  const {
    sendWalletEntryMutation,
    updateEntryMutation,
    deleteEntryMutation,
    entries,
    total,
  } = useWallet({ authorization });

  useEffect(() => {
    if (editItem) {
      setValue('description', editItem.description);
      setValue('value', editItem.value.replace('-', ''));
      setValue('paymentMethod', editItem.paymentMethod);
    }
  }, [editItem, setValue]);

  const onSubmit: SubmitHandler<WalletFormInput> = async (
    { description, value: stringValue, paymentMethod },
    event,
  ) => {
    const newEvent = event as SyntheticEvent<HTMLFormElement, SubmitEvent>;
    const buttonId = newEvent?.nativeEvent.submitter?.id;

    const value = buttonId?.includes('gain')
      ? Math.abs(parseFloat(stringValue.replace(',', '.')))
      : -parseFloat(stringValue.replace(',', '.'));

    if (editItem) {
      updateEntryMutation.mutateAsync({
        id: editItem.id.toString(),
        description,
        value,
        paymentMethod,
        authorization,
      });

      setEditItem(null);
    } else {
      await sendWalletEntryMutation.mutateAsync({
        description,
        paymentMethod,
        value,
        authorization,
      });
    }

    reset();
  };

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

  const formatValor = (valor: string) => {
    const numero = parseFloat(valor.replace('R$', '').replace(',', '.'));
    const valorFormatado =
      numero < 0
        ? `-R$${Math.abs(numero).toFixed(2).replace('.', ',')}`
        : `R$${numero.toFixed(2).replace('.', ',')}`;
    return valorFormatado;
  };

  const getTotalLabel = () =>
    `Total: ${total ? formatValor(total.toString()) : 0}`;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {editItem ? 'Editar Item' : 'Adicionar Novo Item'}
      </Typography>

      <Box
        sx={{
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            width: '100%',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                label="Descrição"
                variant="outlined"
                {...field}
                autoFocus
                ref={descriptionInputRef}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={{ flex: 3 }}
              />
            )}
          />
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <TextField
                label="Valor"
                variant="outlined"
                {...field}
                error={!!errors.value}
                helperText={errors.value?.message}
                sx={{ flex: 2 }}
              />
            )}
          />
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => (
              <TextField
                label="Método de Pagamento"
                variant="outlined"
                {...field}
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod?.message}
                sx={{ flex: 2 }}
              />
            )}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Button
              id={editItem ? 'edit-gain' : 'gain'}
              sx={{ width: '100%', mb: 1 }}
              variant="contained"
              color="success"
              type="submit"
            >
              {editItem ? 'Editar' : 'Ganho'}
            </Button>
            <Button
              id={editItem ? 'edit-expense' : 'expense'}
              variant="contained"
              color="error"
              type="submit"
            >
              {editItem ? 'Editar' : 'Despesa'}
            </Button>
          </Box>
        </form>

        <Typography
          variant="h6"
          sx={{
            color: total && total < 0 ? 'red' : 'green',
            fontWeight: 'bold',
            textAlign: 'right',
            flex: 1,
          }}
        >
          {editItem ? (
            <Button
              id={editItem ? 'edit-gain' : 'gain'}
              sx={{ width: '100%', mb: 1 }}
              variant="contained"
              color="secondary"
              onClick={() => {
                setEditItem(null);
                reset();
              }}
            >
              Cancelar
            </Button>
          ) : (
            getTotalLabel()
          )}
        </Typography>
      </Box>

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
                    {formatValor(value)}
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
                      onClick={() =>
                        handleEdit({ id, description, value, paymentMethod })
                      }
                      id={id.toString()}
                    >
                      <EditIcon sx={{ color: 'orange' }} />
                    </IconButton>
                    <IconButton
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
