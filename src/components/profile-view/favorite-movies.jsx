import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';

export const FavoriteMovies = ({ favoriteMovies, removeFav }) => {
  return (
    <Row>
      <h3>My favorite movies</h3>
      {favoriteMovies.map((movie) => (
        <Col key={movie.id} md={4}>
          <Link to={`/movies/${movie._id}`}>
            {/* Move MovieCard inside Link */}
            <MovieCard movie={movie} />
          </Link>
          <Button variant="secondary" onClick={() => removeFav(movie._id)}>Remove</Button>
        </Col>
      ))}
    </Row>
  )
}
