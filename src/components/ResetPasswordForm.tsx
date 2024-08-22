import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLogin } from '../hooks';
import { ResetPasswordInput, resetPasswordSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { warning } from '../styles';
import { getErrorMessage } from '../utils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { resetPasswordMutation } = useLogin();
  const navigator = useNavigate();
  const [params] = useSearchParams();

  const handleForgotPassword: SubmitHandler<ResetPasswordInput> = async ({
    password,
  }: ResetPasswordInput) => {
    try {
      await resetPasswordMutation.mutateAsync({
        password,
        authorization: params.get('token') ?? '',
      });
      toast.success('Senha salva com sucesso!', warning);
      navigator('/');
    } catch (e) {
      if (e instanceof AxiosError) toast.error(getErrorMessage(e), warning);

      setValue('password', '');
      setValue('repeatPassword', '');
    }
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Digite uma nova senha
          </Typography>
          <form
            onSubmit={handleSubmit(handleForgotPassword)}
            style={{ width: '100%', marginTop: '8px' }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Repetir senha"
              type="password"
              id="repeat-password"
              {...register('repeatPassword')}
              error={!!errors.repeatPassword}
              helperText={errors.repeatPassword?.message}
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
              Salvar
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
