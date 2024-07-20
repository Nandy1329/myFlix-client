import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import  UpdateUser  from './update-user';
import  { FavoriteMovies } from './favorite-movies';
import {UserInfo} from './user-info';
import './profile-view.scss';

const ProfileView = ({ user, setUser, movies, token }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (!user || !movies.length) return;
    setFavoriteMovies(movies.filter((movie) => user.FavoriteMovies.includes(movie._id)));
  }, [user, movies]);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  const removeFav = (id) => {
    const accessToken = localStorage.getItem('token');
    const userId = user.Username;

    axios.delete(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${userId}/movies/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <UserInfo email={user.Email} name={user.Username} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} setUser={handleUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
        <FavoriteMovies
  movies={movies}
  user={user}
  favoriteMoviesList={user.FavoriteMovies}
/>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileView;
