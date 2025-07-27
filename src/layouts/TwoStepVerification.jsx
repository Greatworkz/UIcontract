import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const TwoStepVerification = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/obligations');
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
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
          width: '418px',
          fontSize: '16px',
          px: 4,
          py: 4,
          borderRadius: '20px',
        }}
      >
        <CardContent>
          <Typography
            align="center"
            sx={{ fontFamily: 'Poppins', fontSize: '28px', fontWeight: 600, mb: 1 }}
          >
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
              placeholder="Enter your email"
            />

            <TextField
              margin="normal"
              fullWidth
              required
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder=".  .  .  ."
              label="Enter Code"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                fontSize: '16px',
                backgroundColor: '#1570EF',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                height: '52px',
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
              color: '#1976d2',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={() => navigate(-1)} // Go back
          >
            ← Back
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TwoStepVerification;
