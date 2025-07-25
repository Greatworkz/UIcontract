import React from "react";
import { Card, CardContent, Typography, Box } from '@mui/material';

const CardSection = ({ title, children }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        boxShadow: '0 6px 6px rgba(0,0,0,0.08)', // subtle shadow
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {title && (
          <Typography
            component="h2"
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              mb: 2,
              color: '#212529',
              fontFamily: 'Inter, sans-serif',
              
            }}
          >
            {title}
          </Typography>
        )}
        <Box sx={{ fontSize: '14px' }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardSection;
