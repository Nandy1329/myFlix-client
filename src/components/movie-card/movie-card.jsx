import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100 shadow-1g">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>
                    {movie.Title}
                </Card.Title>
                <Card.Text>
                    {movie.Director.Name}
                </Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant='link'>
                        Open
                    </Button>
                </Link>
            </Card.Body> {/* Fixed missing closing tag */}
        </Card>
    );
};

// Define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired // Added isRequired
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
