import React from 'react';
import PropTypes from 'prop-types';



export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
      <img src={movie.Image} alt={movie.Title} />
      {/* other movie details */}
    </div>


  );
};
// Defines the prop types for the MovieCard component
  
MovieCard.propTypes = {
  
  movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Image: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired,
      Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string,
        }),
    }),
  }).isRequired, // .isRequired is used here because the prop is required
  onClick: PropTypes.func.isRequired
};