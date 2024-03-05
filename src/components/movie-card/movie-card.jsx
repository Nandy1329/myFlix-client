import React from 'react';
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
      <img src={movie.Image} alt={movie.Title} style={{ width: '200px', height: 'auto' }} />
      <p>Genre: {movie.Genre.Name}</p>
      <p>{movie.Genre.Description}</p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string, // Removed .isRequired
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};