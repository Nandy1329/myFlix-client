import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movies) {
    return <div>Loading...</div>; // Placeholder for loading state
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
        <img height={300} src={movie.imagePath} alt="movie poster" />
      </div>
      <div>
        <h4>{movie.title}</h4>
      </div>
      <div>
        <p>{movie.description}</p>
      </div>
      <div>
      <h6>Genre: {Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre.Name}</h6>    
      </div>
      <div>
        <h6>Director: {movie.director}</h6>
      </div>
      <div>
        <h6>Year: {movie.year}</h6>
      </div>
      <Link to={"/"}>
        <Button className="back-button"> Back </Button>
      </Link>
      <Col className="mb-5">
        <hr />
        <h3 className="title"> Similar movies </h3>
        <Row>
          {similarMovies.map((movie) => (
            <Col key={movie.id} xs={6} sm={6} md={6}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Col>
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
        PropTypes.string
      ]).isRequired,
      director: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      imagePath: PropTypes.string.isRequired,
    }).isRequired
  )
};