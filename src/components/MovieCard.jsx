import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {

    return (
        <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none' }}>
            <Card
                sx={{
                    height: '400', 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                }}
            >
                <CardMedia
                    component="img"
                    image={movie.Poster !== 'N/A' ? movie.Poster : '/no-image.png'}
                    alt={movie.Title}
                    sx={{
                        height: 250,
                        width: '100%',
                        objectFit: 'cover', 
                    }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" noWrap>
                        {movie.Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {movie.Year}
                    </Typography>
                </CardContent>

            </Card>
        </Link>
    );
}
