import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-card.scss';

const MovieCard = ({ movie, onMovieClick, isFavMovieCard, removeMovie }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  if (!movie) return null;



  return (
    <Card className="card h-100 movie-card">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title className="fs-6 fw-bolder">{movie.Title}</Card.Title>
        <Card.Text> Directed by: {movie.Director ? movie.Director.Name : 'Unknown'}</Card.Text>            <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">View Movie Info</Button>
        </Link>
        {isFavMovieCard ? (
          <div className="align-right">
            <Button
              className="btn-secondary"
              onClick={function (event) {
                event.preventDefault();
                removeMovie(movie._id);
              }}
              size="sm"
              variant="secondary"
            >
              Remove
            </Button>
          </div>
        ) : (
          false
        )}
      </Card.Body>
    </Card>
  );
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Description: PropTypes.string.isRequired
      }).isRequired,
      Director: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Bio: PropTypes.string.isRequired,
          Birth: PropTypes.string.isRequired
      }).isRequired,
      Featured: PropTypes.bool.isRequired,
      Year: PropTypes.number.isRequired,
      ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

export { MovieCard };
