import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const MovieCard = ({ movie: { Title, ImagePath }, onAddToFavorites, onRemoveFromFavorites, isFavorite, onMovieClick }) => {
  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={ImagePath} alt={`${Title} image`} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Button
          variant="primary"
          onClick={onMovieClick}
          aria-label={`View details for ${Title}`}
          className="me-2"
        >
          View Movie
        </Button>
        <Button
          variant={isFavorite ? "danger" : "secondary"}
          onClick={isFavorite ? onRemoveFromFavorites : onAddToFavorites}
          aria-label={isFavorite ? `Remove ${Title} from favorites` : `Add ${Title} to favorites`}
        >
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
