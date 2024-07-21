// movie-card.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

export const MovieCard = ({ movie, onAddToFavorites, onRemoveFromFavorites, isFavorite, onMovieClick }) => {
    return (
        <Card>
            <Card.Img variant="top" src={movie.ImagePath} onClick={() => onMovieClick(movie._id)} />
            <Card.Body>
                <Card.Title onClick={() => onMovieClick(movie._id)}>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                {isFavorite ? (
                    <Button variant="danger" onClick={() => onRemoveFromFavorites(movie._id)}>Remove from Favorites</Button>
                ) : (
                    <Button variant="primary" onClick={() => onAddToFavorites(movie._id)}>Add to Favorites</Button>
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
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onAddToFavorites: PropTypes.func.isRequired,
    onRemoveFromFavorites: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    onMovieClick: PropTypes.func.isRequired
};
