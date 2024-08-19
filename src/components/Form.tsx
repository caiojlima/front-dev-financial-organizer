import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Implementar a lógica de autenticação aqui
  };
  return (
    <Grid container component="main" sx={ { height: "70%", display: "flex", justifyContent: "center", alignItems: "center" } }>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ borderRadius: "20px", height: "70%", padding: "1em" }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'rgba(45, 146, 42, 0.37)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '8px' }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "rgba(45, 146, 42, 0.37)", "&:hover": { backgroundColor: "green" } }}
            >
              Entrar
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default Form;