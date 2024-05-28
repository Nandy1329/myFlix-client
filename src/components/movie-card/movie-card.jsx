import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, onToggleFavorite, onSelectMovie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
        onToggleFavorite(movie.id, !isFavorite);
    };

    return (
        <Card
            className="movie-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Card.Img variant="top" src={movie.image} className="movie-card-image" />
            </Link>
            <Card.Body>
                <Card.Title className="movieTitle">{movie.title}</Card.Title>
                <Card.Text className="movieGenre">{movie.genre}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link" className="open-button" onClick={onSelectMovie}>Open</Button>
                </Link>
                <Button variant="primary" onClick={handleToggleFavorite}>
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </Button>
                {isHovered && (
                    <div className="description-box">{movie.description}</div>
                )}
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.string,
        description: PropTypes.string,
        genre: PropTypes.string,
        id: PropTypes.string.isRequired,
    }).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    onSelectMovie: PropTypes.func.isRequired,
};
