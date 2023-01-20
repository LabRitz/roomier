import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from './components/App.jsx';
import styles from './stylesheets/styles.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#E0FBFC',
      main: '#3D5A80',
      dark: '#293241',
      contrastText: '#fff',
    },
    text: {
      darkBlue: '#293241',
      midBlue: '#3D5A80',
      lightBlue: '#98C1D9',
    },
  },
  typography: {
    fontFamily: 'DM Sans',
  },
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);