import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isFavorite, onAddToFavorites, onRemoveFromFavorites }) => {



  return (
    <Card className="mb-4">
      <Card.Img variant="top" src={movie.ImagePath} alt={`${movie.Title} image`} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>

        <Link to={`/movies/${movie._id}`}>
          <Button variant="primary" >View Movie
          </Button>
        </Link>
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
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string
    }),
    Year: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired
};

export default MovieCard;
