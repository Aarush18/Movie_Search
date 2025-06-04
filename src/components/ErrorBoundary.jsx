import { Component } from 'react';
import { Button, Container, Typography } from '@mui/material';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" gutterBottom>
            Something went wrong!
          </Typography>
          <Button variant="contained" color="secondary" onClick={this.handleReload}>
            Reload
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}
