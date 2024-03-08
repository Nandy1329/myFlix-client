import React from 'react';
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
      <img src={movie.ImageURL} alt={movie.Title} />
      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre.Name}</p>
      <p>Director: {movie.Name}</p>
      <p>{movie.Bio}</p>
      <p>Birth: {movie.Birth}</p>
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
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,  
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};