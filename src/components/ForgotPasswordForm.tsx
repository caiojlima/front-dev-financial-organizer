import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '../hooks';
import { ForgotPasswordInput, forgotPasswordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { warning } from '../styles';
import { getErrorMessage } from '../utils';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { forgotPasswordMutation } = useLogin();
  const navigator = useNavigate();

  const handleForgotPassword: SubmitHandler<ForgotPasswordInput> = async (
    data: ForgotPasswordInput,
  ) => {
    try {
      await forgotPasswordMutation.mutateAsync(data);
      toast.success('Email enviado com sucesso!', warning);
    } catch (e) {
      if (e instanceof AxiosError) toast.error(getErrorMessage(e), warning);
    }
    setValue('email', '');
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ borderRadius: '20px', padding: '1em' }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'rgba(45, 146, 42, 0.37)' }}>
            <EmailOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Esqueci a senha
          </Typography>
          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            style={{ width: '100%', marginTop: '8px' }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              type="text"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 0.4,
                backgroundColor: 'rgba(45, 146, 42, 0.37)',
                '&:hover': { backgroundColor: 'green' },
              }}
            >
              Enviar
            </Button>
          </form>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: 'rgba(45, 146, 42, 0.37)',
              '&:hover': { backgroundColor: 'green' },
            }}
            onClick={() => navigator('/')}
          >
            Voltar
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};
