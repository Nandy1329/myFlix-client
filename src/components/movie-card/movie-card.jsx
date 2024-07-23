import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const MovieCard = ({ movie, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
  const navigate = useNavigate();

  return (
    <Card className="movie-card">
      <Image src={movie.ImagePath} alt={movie.Title} fluid />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text><strong>Genre:</strong> {movie.Genre?.Name}</Card.Text>
        <Card.Text><strong>Director:</strong> {movie.Director?.Name}</Card.Text>
        <Button variant="info" onClick={() => navigate(`/movies/${movie._id}`)}>
          View Movie
        </Button>
        {isFavorite ? (
          <Button variant="danger" onClick={() => onRemoveFromFavorites(movie._id)}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant="primary" onClick={() => onAddToFavorites(movie._id)}>
            Add to Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string
    }),
  }).isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
