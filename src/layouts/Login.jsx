import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/obligations');
  };

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        height: '100vh',
        backgroundColor: '#061445',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          fontSize: '16px',
          px: 3,
          py: 3,
          boxShadow: 6,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography  align="center" sx={{ fontFamily: 'Poppins',fontSize: '28px', fontWeight: 600}}>
            Login to your account
          </Typography>

          <Box component="form" onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              fullWidth
              required
              id="email"
              label="Email"
              name="email"
              type="email"
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="password"
              label="Password"
              name="password"
              type="password"
            />

            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
                mt: 3,
                // py: ,
                fontSize: '16px',
                backgroundColor: '#1570EF',
                textTransform: 'none',
                fontWeight: 500,
                borderRadius: '8px',
                '&:hover': {
                backgroundColor: '#175CD3',
                },
            }}
            >
            Login now
            </Button>

          </Box>

          <Typography
            variant="body2"
            align="center"
            sx={{
              mt: 3,
              color: '#a8a8a8',
              fontSize: '14px',
            }}
          >
            Need help?{' '}
            <Box component="span" sx={{ color: '#1976d2', cursor: 'pointer' }}>
              Support
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
