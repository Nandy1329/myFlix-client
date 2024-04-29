import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const foundMovie = movies.find((m) => m.id === movieId);
    setMovie(foundMovie);
  }, [movies, movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const similarMovies = movies.filter((m) => (
    m.id !== movie.id &&
    (m.genre.some((genre) => movie.genre.includes(genre)) || // Check genre similarity
    m.director === movie.director || // Check director similarity
    m.year === movie.year) // Check release year similarity
  ));

  return (
    <div>
      {/* Movie details rendering */}
      <h3 className="title">Similar movies</h3>
      {similarMovies.length > 0 ? (
        <div>
          {similarMovies.map((similarMovie) => (
            <MovieCard key={similarMovie.id} movie={similarMovie} />
          ))}
        </div>
      ) : (
        <div>No similar movies found</div>
      )}
    </div>
  );
};


MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]).isRequired,
      director: PropTypes.string.isRequired,
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieView;
