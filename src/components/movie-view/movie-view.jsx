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
    <div>
      <div>
        <img height={300} src={movie.image} alt={movie.title} />
      </div>
      <div>
        <h4>{movie.title}</h4>
      </div>
      <div>
        <div>{movie.description}</div> {/* Change <p> to <div> */}
      </div>
      <div>
        <h6>Genre: {movie.genre}</h6>
      </div>
      <div>
        <h6>Director: {movie.director}</h6>
      </div>
      <div>
        <h6>Year: {movie.year}</h6>
      </div>
      <Link to="/">
        <Button className="back-button">Back</Button>
      </Link>
      <hr />
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
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
