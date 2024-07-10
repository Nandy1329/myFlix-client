import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const MovieView = ({ movie, onBackClick, addMovie, removeMovie, username, FavoriteMovies }) => {
    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <Row className="my-5 justify-content-center">
            <Col md={5}>
                <img src={movie.ImagePath} alt="movie cover" className="img-fluid" />
            </Col>
            <Col md={3}>
                <div className="my-1">
                    <span className="h1">{movie.Title}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Description: </span>
                    <span>{movie.Description}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Director: </span>
                    <span>{movie.Director.Name}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Genre: </span>
                    <span>{movie.Genre.Name}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Year: </span>
                    <span>{movie.Year}</span>
                </div>
                <Button onClick={onBackClick} variant="link">Back</Button>
            </Col>
        </Row>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Year: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
    addMovie: PropTypes.func.isRequired,
    removeMovie: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired
};
