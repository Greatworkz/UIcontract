import React from "react";
import { Card, CardContent, Typography, Box } from '@mui/material';

const CardSection = ({ title, children }) => {
  return (
    <Card
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '13px',
        fontWeight: 500,
        border: '1px solid #0A18290D'
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
