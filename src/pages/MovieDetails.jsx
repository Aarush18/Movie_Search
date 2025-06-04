import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetails } from '../api/omdb';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading)
    return (
      <Container className="flex justify-center items-center h-64">
        <CircularProgress />
      </Container>
    );

  if (error) return <Typography color="error">{error}</Typography>;

  if (!movie) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          image={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
          alt={movie.Title}
        />
        <CardContent>
          <Typography variant="h4">{movie.Title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {movie.Year} | {movie.Genre}
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            {movie.Plot}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Director:</strong> {movie.Director}
          </Typography>
          <Typography variant="body2">
            <strong>Actors:</strong> {movie.Actors}
          </Typography>
          <Typography variant="body2">
            <strong>Rating:</strong> {movie.imdbRating}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
