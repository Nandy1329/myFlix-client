import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies')
    .then(response => response.json())
    .then(movies => {
      // Ensure every movie has a Genre property
      const moviesWithGenres = movies.map(movie => ({
        ...movie,
        Genre: movie.Genre || { Name: 'Unknown', Description: 'No description available' },
      }));

      setMovies(moviesWithGenres);
    });
}, []);

  
  const onMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const onBackClick = () => {
    setSelectedMovie(null);
  };

  if (selectedMovie) {
    return (
      <div>
        <MovieCard movie={selectedMovie} />
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  }

  return (
    <div>
      {movies.map(movie => (
        <div key={movie._id} onClick={() => onMovieClick(movie)}>
          <h2>{movie.Title}</h2>
        </div>
      ))}
    </div>
  );
};