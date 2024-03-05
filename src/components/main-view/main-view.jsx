import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card.jsx';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const onMovieClick = (movie) => {
    console.log(movie);
  };

  useEffect(() => {
    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies')
      .then(response => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      {movies.map(movie => (
        <div key={movie._id} onClick={() => onMovieClick(movie)}>
          <h2>{movie.Title}</h2>
          <p>{movie.Description}</p>
          <img src={movie.ImageURL} alt={movie.Title} style={{ width: '100%', maxWidth: '300px', height: 'auto' }} />
          {/* Add checks for movie.Genre as it might be undefined for some movies */}
          {movie.Genre && <p>Genre: {movie.Genre.Name}</p>}
          {movie.Genre && <p>{movie.Genre.Description}</p>}
        </div>
      ))}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,  
    }).isRequired,
  }).isRequired,
})
};