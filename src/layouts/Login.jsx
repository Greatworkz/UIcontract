import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  InputBase,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../Apis/ApiConfig";
import LogoSvg from "../assets/icons/logo.svg";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const details = {
      email: loginDetails.email,
      password: loginDetails.password,
    };
    try {
      // setLoading(true);
      const response = await LoginApi(details);
    } catch (error) {
      // Toast.error('An error occured during login');
      console.log("========", error);
      return;
    } finally {
      // setLoading(false)
    }

    // Need Handle Condition for based on responce

    navigate("/twostepVerification");
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        maxWidth: "100vw",
        height: "100vh",
        backgroundColor: "#061445",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <img src={LogoSvg} width="200" alt="Logo" />
      </Box>
      <Card
        sx={{
          width: "418px",
          // maxWidth: 400,
          // height: '464px',
          fontSize: "16px",
          px: 4,
          py: 4,
          // boxShadow: 6,
          borderRadius: "20px",
        }}
      >
        <CardContent>
          <Typography
            align="center"
            sx={{
              fontFamily: "Poppins",
              fontSize: "28px",
              fontWeight: 600,
              mb: 1,
            }}
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
              value={loginDetails.email}
              onChange={handleChange}
              InputProps={{
                disableUnderline: true,
                sx: {
                  border: "1px solid #D1E9FF",
                  borderRadius: "8px",
                  height: "48px",
                  padding: "0px", // remove internal padding
                  "& input": {
                    padding: "12px 16px", // apply padding inside the input
                  },
                },
              }}
              sx={{
                width: "314px",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none", // remove default outline
                },
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginDetails.password}
              onChange={handleChange}
              placeholder="Enter your password"
              label="Password"
              variant="standard" // use "standard" variant to control underline
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="center">
                    <IconButton onClick={handleTogglePassword} edge="center">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  border: "1px solid #D1E9FF",
                  borderRadius: "8px",
                  height: "48px",
                  padding: 0,
                  "& input": {
                    padding: "12px 16px",
                  },
                },
              }}
              sx={{
                width: "314px",
                "& .MuiInputBase-root": {
                  backgroundColor: "#fff",
                },
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                // py: ,
                fontSize: "16px",
                backgroundColor: "#1570EF",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                height: "52px",
                "&:hover": {
                  backgroundColor: "#175CD3",
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
              color: "#a8a8a8",
              fontSize: "16px",
            }}
          >
            Need help?{" "}
            <Box component="span" sx={{ color: "#1976d2", cursor: "pointer" }}>
              Support
            </Box>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
