import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import MovieDetails from './pages/MovieDetails';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';  // 👈 import error boundary

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ErrorBoundary>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
