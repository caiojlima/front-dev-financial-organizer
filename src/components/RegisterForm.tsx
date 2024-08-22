import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { warning } from '../styles';
import { getErrorMessage } from '../utils';
import { useNavigate } from 'react-router-dom';
import { RegisterFormInput, registerSchema } from '../schemas';
import { useUserRegister } from '../hooks';

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema),
  });

  const { userRegisterMutation } = useUserRegister();
  const navigator = useNavigate();

  const handleRegister: SubmitHandler<RegisterFormInput> = async ({
    email,
    password,
    name,
  }: RegisterFormInput) => {
    try {
      await userRegisterMutation.mutateAsync({ email, password, name });
      navigator('/');
    } catch (e) {
      if (e instanceof AxiosError) toast.error(getErrorMessage(e), warning);
      setValue('email', '');
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
            <PersonAddAltOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastre-se
          </Typography>
          <form
            onSubmit={handleSubmit(handleRegister)}
            style={{ width: '100%', marginTop: '8px' }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Nome completo"
              autoComplete="name"
              autoFocus
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              onBlur={() => trigger('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
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
              Registrar
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
