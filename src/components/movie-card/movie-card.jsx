import React from 'react';
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
      <img src={movie.Image} alt={movie.Title} style={{ width: '200px', height: 'auto' }} />
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};