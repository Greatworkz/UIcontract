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

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '35px',
          fontSize: '14px',
          '& input': {
            padding: '8px 10px',
            fontSize: '14px',
          },
        },
      },
    },

    MuiInputBase: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          border: '1px solid #E5E5E5',
          borderRadius: '8px',
          padding: '6px 10px',
          fontSize: '14px',
          backgroundColor: '#fff',
          fontFamily: 'Inter, sans-serif',
          transition: 'all 0.2s ease-in-out',
          minHeight: '30px',
          '&:focus-within': {
            borderColor: '#D1E9FF', //1976d2
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
          fontSize: '16px',
          fontWeight: 400,
          fontFamily: 'Inter, sans-serif',
          color: '#344054',
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
        root: {
          fontFamily: 'Inter, sans-serif',
          maxHeight: '34px',
        },
        select: {
          padding: '4px 10px',
          fontSize: '13px',
          backgroundColor: '#fff',
          borderRadius: '8px',
        },
        icon: {
          color: '#495057',
        },
      },
    },
  },
});

export default theme;
