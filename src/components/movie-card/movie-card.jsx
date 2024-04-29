import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

export const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.imagePath} /> 
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title> 
        <Card.Text>{movie.director && movie.director.name}</Card.Text>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="primary" className="w-100 primaryButton">Details</Button>
        </Link>
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
};
