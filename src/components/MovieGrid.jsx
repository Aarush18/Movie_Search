import { Grid, Skeleton, Typography } from '@mui/material';
import MovieCard from './MovieCard';
import MovieSkeleton from './MovieSkeleton';

export default function MovieGrid({ movies, isLoading }) {
  if (isLoading) return <MovieSkeleton/>

  if (!movies.length) {
    return <Typography>No movies found.</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
