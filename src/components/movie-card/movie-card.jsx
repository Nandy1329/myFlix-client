import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, onAddToFavorites, onMovieClick }) => {
    const { _id, Title, Description, ImagePath } = movie;

    const handleAddToFavoritesClick = () => {
        if (typeof onAddToFavorites === 'function') {
            onAddToFavorites(_id);
        }
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ImagePath} />
            <Card.Body>
                <Card.Title>{Title}</Card.Title>
                <Card.Text>{Description}</Card.Text>
                <Button variant="primary" onClick={handleAddToFavoritesClick}>
                    Add to Favorites
                </Button>
                <Link to={`/movies/${_id}`}>
                    <Button variant="secondary" className="mt-2" onClick={onMovieClick}>
                        Open Movie
                    </Button>
                </Link>
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
    }).isRequired,
    onAddToFavorites: PropTypes.func.isRequired,
    onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;