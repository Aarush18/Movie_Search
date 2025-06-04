import { useEffect, useState, useRef, useCallback } from 'react';
import { Alert, CircularProgress, Typography } from '@mui/material';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import MovieGrid from '../components/MovieGrid';
import { searchMovies } from '../api/omdb';

export default function SearchPage() {
    const [search, setSearch] = useState('');
    const [year, setYear] = useState('');
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const observer = useRef();

    // Debounce search
    const [debouncedQuery, setDebouncedQuery] = useState(search);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(search);
        }, 500);

        return () => clearTimeout(handler);
    }, [search]);

    // Fetch movies
    const fetchMovies = useCallback(async () => {
        if (!debouncedQuery) {
            setMovies([]);
            setHasMore(false);
            return;
        }

        setLoading(true);
        setError('');
        try {
            const data = await searchMovies(debouncedQuery, page, year);
            if (data.Response === 'True') {
                setMovies((prev) => (page === 1 ? data.Search : [...prev, ...data.Search]));
                setHasMore(data.Search.length === 10); // OMDB returns 10 per page
            } else {
                if (page === 1) {
                    setMovies([]);
                    setHasMore(false);
                    setError(data.Error || 'No results found.');
                } else {
                    setHasMore(false);
                }
            }
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    }, [debouncedQuery, page, year]);
    useEffect(() => {
        setPage(1); // Reset to first page when search or year changes
    }, [debouncedQuery, year]);

    useEffect(() => {
        if (debouncedQuery) {
            fetchMovies();
        }
    }, [debouncedQuery, page, year, fetchMovies]);


    const loadMoreRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const handleClear = () => {
        setSearch('');
        setYear('');
        setMovies([]);
        setPage(1);
        setHasMore(false);
        setError('');
    };

    return (
        <div>
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: 'primary.main',
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                }}
            >
                Movie Search
            </Typography>

            <SearchBar search={search} setSearch={setSearch} onClear={handleClear} />
            <Filters year={year} setYear={setYear} />

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <MovieGrid movies={movies} isLoading={loading && page === 1} />


            <div ref={loadMoreRef} style={{ height: '20px' }}></div>

            {loading && page > 1 && (
                <div style={{ textAlign: 'center', margin: '1rem' }}>
                    <CircularProgress />
                </div>
            )}
        </div>
    );
}
