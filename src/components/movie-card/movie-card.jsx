import React from 'react';
import PropTypes from 'prop-types';

// div shows the movie title, image
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
      <img src={movie.Image} alt={movie.Title} />

    </div>


  );
};
// Defines the prop types for the MovieCard component
  
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };