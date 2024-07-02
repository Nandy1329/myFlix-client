import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {

    return (
        <Card className="h-100 shadow-1g">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director && movie.Director.Name}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
       Movie: PropTypes.shape({
        Title: PropTypes.string,
    }).isRequired
};