import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const MovieView = ({ movies, addFav, removeFav, user }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    const isFavorite = user?.FavoriteMovies?.includes(movie._id);

    return (
        <div>
            <h1>{movie.Title}</h1>
            <p><strong>Genre:</strong> {movie.Genre?.Name}</p>
            <p><strong>Director:</strong> {movie.Director?.Name}</p>
            <img src={movie.ImagePath} alt={movie.Title} />
            {isFavorite ? (
                <Button onClick={() => removeFav(movie._id)}>Remove from Favorites</Button>
            ) : (
                <Button onClick={() => addFav(movie._id)}>Add to Favorites</Button>
            )}
        </div>
    );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object).isRequired,
    addFav: PropTypes.func.isRequired,
    removeFav: PropTypes.func.isRequired,
    user: PropTypes.shape({
        FavoriteMovies: PropTypes.arrayOf(PropTypes.string)
    })
};