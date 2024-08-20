import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import { LoginFormInput, loginSchema } from "../schemas/loginSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { warning } from "../styles/toast.style";
import { getErrorMessage } from "../utils/error.util";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema)
  });

  const { loginMutation } = useLogin();
  const navigator = useNavigate()

  const handleLogin: SubmitHandler<LoginFormInput> = async (data: LoginFormInput) => {
    try {
      const { data: { accessToken } } = await loginMutation.mutateAsync(data);
      navigator("/wallet", { state: accessToken });
    } catch (e) {
      if (e instanceof AxiosError)
        toast.error(getErrorMessage(e), warning)
      setValue("email", "")
      setValue("password", "")
    }
  };

  return (
    <Grid container component="main" sx={{ height: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ borderRadius: "20px", height: "70%", padding: "1em" }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'rgba(45, 146, 42, 0.37)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={handleSubmit(handleLogin)} style={{ width: '100%', marginTop: '8px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              {...register('email')}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "rgba(45, 146, 42, 0.37)", "&:hover": { backgroundColor: "green" } }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot-password" variant="body2">
                  Esqueci a senha
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Não tem uma conta? Registre-se"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Form;