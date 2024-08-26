import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { WalletFormInput, walletSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SyntheticEvent, useEffect } from 'react';
import { WalletInputProps } from '../types';
import { useSessionStorage, useWallet } from '../hooks';
import { CalculationHelper } from '../utils';
import { Loading } from './Loading';

export const WalletInput = ({
  editItem,
  setEditItem,
  descriptionInputRef,
  sendWalletEntryMutation,
  updateEntryMutation,
  isLoading,
}: WalletInputProps) => {
  const matches = useMediaQuery('(min-width:600px)');
  const { getToken } = useSessionStorage();
  const authorization = getToken() ?? '';
  const { total } = useWallet({
    authorization,
  });
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

  const getTotalLabel = () =>
    `Total: ${total ? CalculationHelper.formatValue(total.toString()) : 0}`;

  useEffect(() => {
    if (editItem) {
      setValue('description', editItem.description);
      setValue('value', editItem.value.replace('-', ''));
      setValue('paymentMethod', editItem.paymentMethod);
    }
  }, [editItem, setValue]);

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: matches ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: matches ? 'initial' : 'column',
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
              sx={{ flex: 4, width: '100%' }}
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
              sx={{ flex: 2, width: '100%' }}
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
              sx={{ flex: 2, width: '100%' }}
            />
          )}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            width: matches ? null : '80%',
          }}
        >
          <Button
            id={editItem ? 'edit-gain' : 'gain'}
            sx={{ width: '100%', mb: 1 }}
            variant="contained"
            color="success"
            type="submit"
            disabled={isLoading}
          >
            {editItem ? 'Editar' : 'Ganho'}
          </Button>
          <Button
            id={editItem ? 'edit-expense' : 'expense'}
            variant="contained"
            color="error"
            type="submit"
            disabled={isLoading}
          >
            {editItem ? 'Editar' : 'Despesa'}
          </Button>
        </Box>
      </form>
      {editItem ? (
        <Button
          id={editItem ? 'edit-gain' : 'gain'}
          sx={{ width: matches ? null : '100%', mb: 1 }}
          variant="contained"
          color="secondary"
          disabled={isLoading}
          onClick={() => {
            setEditItem(null);
            reset();
          }}
        >
          Cancelar
        </Button>
      ) : (
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
      )}
      {isLoading && <Loading />}
    </Box>
  );
};
