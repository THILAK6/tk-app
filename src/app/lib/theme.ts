import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: "#330c0b",
      paper: "#441618"
    },
    primary: {
      main: "#bb5b73",
      light: "#cf7b91",
      dark: "#9d3d55"
    },
    secondary: {
      main: "#fd8149",
      light: "#ff9d6f",
      dark: "#d65f24"
    },
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
    }
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: '2rem',
          paddingBottom: '2rem'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(187, 91, 115, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(187, 91, 115, 0.5)',
            }
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(187, 91, 115, 0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(187, 91, 115, 0.5)',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '1rem'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#441618',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem'
        }
      }
    }
  },
  typography: {
    h4: {
      fontWeight: 600,
      marginBottom: '1.5rem',
      color: '#ffffff'
    }
  }
};

const theme = createTheme(themeOptions);

export default theme;
