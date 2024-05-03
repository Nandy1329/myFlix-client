import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const addToFavorites = () => {
    if (!user || !token) {
      // User is not logged in, handle accordingly
      return (
        <Card className='h-100'>
        <Card.Img variant='top' src={movie.image} />
        <Card.Body>
            <Card.Title>
                {movie.title}
            </Card.Title>
            <Card.Text>
                {movie.director}
            </Card.Text>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Button variant='link'>
                    Open
                </Button>
            </Link>
        </Card.Body>
    </Card>
);


MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
  isFavorite: PropTypes.bool.isRequired
    };
  }
}