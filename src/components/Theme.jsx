import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          color: '#21263C',
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'standard',
        InputProps: {
          disableUnderline: true,
        },
      },
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          "&.compact-input": {
            minWidth: "unset"
          }
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '35px',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
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
          fontSize: '13px',
          backgroundColor: '#fff',
          fontFamily: 'Inter, sans-serif',
          transition: 'all 0.2s ease-in-out',
          minHeight: '34px',
          minWidth: '240px',
          color: '#21263C',
          fontWeight: 500,
          '&:focus-within': {
            borderColor: '#D1E9FF',
          },
          "&.compact-input": {
            minWidth: "unset"
          }
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
          minWidth: '240px'
        },
        select: {
          padding: '4px 10px',
          fontSize: '13px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          fontFamily: 'Inter, sans-serif',
        },
        icon: {
          color: '#495057',
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            height: '3px',
            borderRadius: '2px',
            backgroundColor: '#2268E9',
            width: 'fit-content',
            fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: '13px',
          fontWeight: 400,
          textTransform: 'none',
          fontFamily: 'Inter, sans-serif',
          color: '#061445',
          width: 'auto',
          '&.Mui-selected': {
            fontWeight: 600,
            color: '#21263C',
             fontFamily: 'Inter, sans-serif',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none'
        },
      },
    },
  },
});

export default theme;
