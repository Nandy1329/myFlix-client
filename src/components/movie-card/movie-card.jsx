import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isFavorite, handleAddToFavorites, handleRemoveFromFavorites }) => {{
    console.log(movie);
  };



  return (
    <Card className="mb-3">
      <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-view">
        <Card.Img variant="top" src={movie.imagePath} className="object-fit-cover" />
      </Link>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
        <Card.Text>{movie.director}</Card.Text>
        <Card.Text>{movie.releaseDate}</Card.Text>
        <Card.Text>{movie.imagePath}</Card.Text>
        {isFavorite ? (
          <Button variant="primary" onClick={() => handleRemoveFromFavorites(movie)}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant="primary" onClick={() => handleAddToFavorites(movie)}>
            Add to Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    genre: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleAddToFavorites: PropTypes.func.isRequired,
  handleRemoveFromFavorites: PropTypes.func.isRequired,
};

export default MovieCard;
