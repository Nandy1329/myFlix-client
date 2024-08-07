// src/components/movie-card/movie-card.jsx
import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const MovieCard = ({ movie, onAddToFavorites, onRemoveFromFavorites, isFavorite, onMovieClick }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={movie.ImagePath} alt={`${movie.Title} image`} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Button variant="primary" onClick={onMovieClick}>View Movie</Button>
        <Button variant="secondary" onClick={isFavorite ? onRemoveFromFavorites : onAddToFavorites}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
