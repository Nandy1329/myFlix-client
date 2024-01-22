import React from 'react';
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <h2>{movie.Title}</h2>
      <img src={movie.Image} alt={movie.Title} />
      {/* other movie details */}
    </div>
  );
};