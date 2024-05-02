import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, isFavorite }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const addToFavorites = () => {
    if (!user || !token) {
      // User is not logged in, handle accordingly
      return;
    }
    // Implement the logic to add the movie to favorites here
    // For example:
    // setAddTitle(movie.title);
  };

  const removeFromFavorites = () => {
    if (!user || !token) {
      // User is not logged in, handle accordingly
      return;
    }
    // Implement the logic to remove the movie from favorites here
    // For example:
    // setDelTitle(movie.title);
  };

  useEffect(() => {
    // Call the function to add movie to favorites when addTitle changes
    // addToFavorites();
  }, [user, token]);

  useEffect(() => {
    // Call the function to remove movie from favorites when delTitle changes
    // removeFromFavorites();
  }, [user, token]);

  return (
    <Card>
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director && movie.director.name}</Card.Text>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="primary" className="w-100 primaryButton">
            Details
          </Button>
        </Link>
        {isFavorite ? (
          <Button onClick={removeFromFavorites} className="w-100 mt-2">
            Remove from Favorites
          </Button>
        ) : (
          <Button onClick={addToFavorites} className="w-100 mt-2">
            Add to Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
