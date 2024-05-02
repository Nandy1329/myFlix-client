import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MovieCard from '../movie-card/movie-card';
import { Link } from 'react-router-dom';
import './favorite-movies.scss';

export const FavoriteMovies = ({ user, movies, token }) => {
  const [data, setData] = useState(null);
  if (Array.isArray(movies) && user && Array.isArray(user.FavoriteMovies)) {
  const favoriteMovies = movies.filter((movie) => movie && user.FavoriteMovies.includes(movie._id));
  
  


  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = {
      FavoriteMovies: user.FavoriteMovies
    };

    fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.UserName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data));
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Col className="mb-5">
      <h3 className="title">List of favorite movies</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} md={6}>
            <Link to={`/movies/${movie._id}`}>
              <MovieCard
                key={movie._id}
                isFavorite={user.FavoriteMovies.includes(movie._id)}
                movie={movie}
              />
            </Link>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

FavoriteMovies.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired
};
}