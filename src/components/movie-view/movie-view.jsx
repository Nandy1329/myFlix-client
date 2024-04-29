import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, Link } from "react-router-dom";
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

  const similarMovies = movies.filter((m) => {
    return (
      m.id !== movie.id &&
      (Array.isArray(m.genre)
        ? m.genre.some((genre) => movie.genre.includes(genre))
        : m.genre === movie.genre)
    );
  });

  return (
    <div className="movie-view">
      <div>
        <img className="w-100" src={movie.imagePath} alt={movie.title} />
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Year: </span>
          <span>{movie.year}</span>
        </div>
        <Link to="/">
          <Button className="back-button">Back</Button>
        </Link>
        <hr />
        <h3 className="title">Similar movies</h3>
      </div>
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
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      imagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieView;
