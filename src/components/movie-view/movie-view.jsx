// src/components/movie-view/movie-view.jsx
import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './movie-view.scss'; // Import your SCSS file with styles

const MovieView = ({ movies, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <Card className="mb-4 movie-view-card">
            <Card.Img className="movie-view-img" variant="top" src={movie.ImagePath} alt={`${movie.Title} image`} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Card.Text><strong>Director:</strong> {movie.Director.Name}</Card.Text>
                <Card.Text><strong>Genre:</strong> {movie.Genre.Name}</Card.Text>
                <Card.Text><strong>Year:</strong> {movie.Year}</Card.Text>
                <Button variant="secondary" onClick={isFavorite ? onRemoveFromFavorites : onAddToFavorites}>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieView.propTypes = {
    movies: PropTypes.array.isRequired,
    onAddToFavorites: PropTypes.func.isRequired,
    onRemoveFromFavorites: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
};

export default MovieView;