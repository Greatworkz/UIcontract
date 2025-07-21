import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  
  components: {
    Typography: {
      fontFamily: 'Inter, sans-serif',
      color: '#21263C'
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        InputProps: {
          disableUnderline: true,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '1px solid #ced4da',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '15px',
          backgroundColor: '#fff',
          fontFamily: 'Inter, sans-serif',
          transition: 'all 0.2s ease-in-out',
          '&:focus-within': {
            borderColor: '#1976d2',
          },
        },
        input: {
          padding: 0,
        },
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
      styleOverrides: {
        root: {
          fontSize: '15px',
          fontWeight: 500,
          fontFamily: 'Inter, sans-serif',
          color: '#212529',
          transform: 'translate(0, -6px) scale(0.85)',
        },
      },
    },
    MuiSelect: {
        defaultProps: {
          variant: 'standard',
          disableUnderline: true,
        },
        styleOverrides: {
          select: {
            padding: '2px',
            fontSize: '15px',
            backgroundColor: '#fff',
            borderRadius: '8px', // for smooth corners inside the box
          },
          icon: {
            color: '#495057',
          },
          root:{
            fontFamily: 'Inter, sans-serif',
          }
        },
    },
      
  },
});

export default theme;
