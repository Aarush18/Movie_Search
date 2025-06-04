const API_KEY = 'b8a02fd2';

export const searchMovies = async (query, page = 1, year = '') => {
  try {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}${year ? `&y=${year}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch movies.');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { Response: 'False', Error: 'Failed to fetch movies' };
  }
};

export const getMovieDetails = async (id) => {
  try {
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch movie details.');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { Response: 'False', Error: 'Failed to fetch details' };
  }
};
