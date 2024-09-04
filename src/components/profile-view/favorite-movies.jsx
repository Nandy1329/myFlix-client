import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user, removeFav }) => {
    if (!movies.length || !user || !user.FavoriteMovies.length) {
        return <div>No favorite movies available</div>;
    }

    const favoriteMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie._id));

    return (
        <div>
            <h2>Favorite Movies</h2>
            <Row>
                {favoriteMovies.map((movie) => (
                    <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard
                            movie={movie}
                            onRemoveFromFavorites={() => removeFav(movie._id)}
                            isFavorite={true}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

FavoriteMovies.propTypes = {
    movies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    removeFav: PropTypes.func.isRequired,
};
