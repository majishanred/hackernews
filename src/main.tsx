import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    white: string;
    blue: string;
  }

  interface PaletteOptions {
    white: string;
    blue: string;
  }
}

const theme = createTheme({
  palette: {
    white: '#ffffff',
    blue: '#5a98f2',
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CssBaseline>
  </React.StrictMode>,
);
