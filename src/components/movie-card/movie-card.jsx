import React from 'react';
import PropTypes from 'prop-types';

function MovieCard({ movie, onMovieClick }) {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
            <div className="movie-image">
            <img 
        src={movie.ImageURL} 
        alt="movie cover" 
        style={{ 
          width:'25%', 
          height: '25%', 
          objectFit: 'cover',
          position: 'relative' 
        }} 
        onError={(e) => { e.target.onerror = null; e.target.src = "default_image_url"; }}
      />
      </div>      <p>{movie.Description}</p>
      <p>Genre: {movie.Genre.Name}</p>
      <p>Director: {movie.Director.Name}</p>
    </div>
  );
}


MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string, // Not required
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string, // Not required
    }).isRequired,
    ImageUrl: PropTypes.string, // Not required
    Featured: PropTypes.bool.isRequired, 
  }).isRequired,
};
export default MovieCard;