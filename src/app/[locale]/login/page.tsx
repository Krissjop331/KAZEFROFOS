'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f5f5f5',
}));

const StyledForm = styled('form')(({ theme }) => ({
  backgroundColor: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  width: '100%',
  maxWidth: 400,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: '#ffa726',
  '&:hover': {
    backgroundColor: '#fb8c00',
  },
}));

interface LoginResponse {
  access_token: string;
}

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        if (data.access_token) {
          login(data.access_token);
        } else {
          setError('Не удалось получить токен доступа');
        }
      } else {
        setError('Неверные учетные данные');
      }
    } catch (err) {
      console.error('Ошибка при входе:', err);
      setError('Произошла ошибка при попытке входа');
    }
  };

  return (
    <StyledContainer>
      <StyledForm onSubmit={handleLogin}>
        <Typography variant="h4" align="center" gutterBottom>
          АВТОРИЗАЦИЯ
        </Typography>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="Введите username"
        />
        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          placeholder="Введите пароль"
        />
        {error && <Typography color="error">{error}</Typography>}
        <StyledButton type="submit" fullWidth variant="contained">
          АВТОРИЗОВАТЬСЯ
        </StyledButton>
      </StyledForm>
    </StyledContainer>
  );
}