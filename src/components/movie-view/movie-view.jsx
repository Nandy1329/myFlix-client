import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre.Name}</p>
      <p>Director: {movie.Director.Name}</p>
      <p>Bio: {movie.Director.Bio}</p>
      <p>Birthday: {movie.Director.Birth}</p>
      <img src={movie.Image} alt={movie.Title} style={{ width: '200px', height: 'auto' }} />
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    }).isRequired,
    Image: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};