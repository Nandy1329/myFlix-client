import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieCard = ({ movie, isFavorite, onAddToFavorites, onRemoveFromFavorites }) => {
  const [apiMovie, setApiMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(`/api/movies/${movie._id}`);
        setApiMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [movie._id]);

  if (!apiMovie) {
    return <div>Loading...</div>;
  }

  const isDataMatching = (
    movie.Title === apiMovie.Title &&
    movie.Description === apiMovie.Description &&
    movie.Genre?.Name === apiMovie.Genre?.Name &&
    movie.Director?.Name === apiMovie.Director?.Name
  );

  return (
    <Card className="movie-card">
      <Image src={movie.ImagePath} alt={movie.Title} fluid />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text><strong>Genre:</strong> {movie.Genre?.Name}</Card.Text>
        <Card.Text><strong>Director:</strong> {movie.Director?.Name}</Card.Text>
        <Button variant="info" onClick={() => navigate(`/movies/${movie._id}`)}>
          View Movie
        </Button>
        {isFavorite ? (
          <Button variant="danger" onClick={() => onRemoveFromFavorites(movie._id)}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant="primary" onClick={() => onAddToFavorites(movie._id)}>
            Add to Favorites
          </Button>
        )}
        {!isDataMatching && <div>Data mismatch detected!</div>}
      </Card.Body>
    </Card>
  );
};

export default MovieCard;