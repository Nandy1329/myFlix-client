import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

const MovieCard = ({ movie, onMovieClick, isFavMovieCard, removeMovie }) => {

  if (!movie) return null;

  return (
    <Card className="card h-100 movie-card">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title className="fs-6 fw-bolder">{movie.Title}</Card.Title>
        <Card.Text> Directed by: {movie.Director ? movie.Director.Name : 'Unknown'}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">View Movie Info</Button>
        </Link>
        {isFavMovieCard ? (
          <div className="align-right">
            <Button
              className="btn-secondary"
              onClick={(event) => {
                event.preventDefault();
                removeMovie(movie._id);
              }}
              size="sm"
              variant="secondary"
            >
              Remove
            </Button>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
    ImagePath: PropTypes.string,
  }),
  onMovieClick: PropTypes.func,
  isFavMovieCard: PropTypes.bool,
  removeMovie: PropTypes.func,
};

export { MovieCard };
