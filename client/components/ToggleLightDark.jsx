import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from './App';
import ColorModeContext from './context/ColorModeContext';

const queryClient = new QueryClient();

export const ToggleLightDark = () => {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => {
        document.body.style.background = (prevMode === 'light')
          ? '#293241'
          : 'linear-gradient(180deg,rgb(214, 214, 214) 85%,rgba(169, 169, 169, 0.903)95%,  rgba(140, 140, 140, 0.937) 98%, rgba(0, 25, 46, 0.585))';

        return (prevMode === 'light' ? 'dark' : 'light');
      });
    },
  }), []);

  const getDesignTokens = (version) => ({
    palette: {
      mode: version,
      ...(version === 'light'
        ? {
          primary: {
            main: '#3D5A80',
          },
          secondary: {
            main: '#fff',
          },
          background: {
            default: '#3D5A80',
            paper: '#fff',
          },
          text: {
            primary: '#293241',
            secondary: '#3D5A80',
            ternary: '#5f6266',
            darkBlue: '#293241',
            midBlue: '#3D5A80',
            lightBlue: '#98C1D9',
            grey: '#7a7a7a',
          },
        }
        : {
          primary: {
            main: '#3D5A80',
          },
          secondary: {
            main: '#fff',
          },
          background: {
            default: '#293241',
            paper: '#3D5A80',
          },
          text: {
            primary: '#e8e6e6',
            secondary: '#E0FBFC',
            ternary: '#98C1D9',
            darkBlue: '#293241',
            midBlue: '#3D5A80',
            lightBlue: '#98C1D9',
          },
        }),
    },
    typography: {
      fontFamily: 'DM Sans',
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
};
