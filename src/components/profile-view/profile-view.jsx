import React from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

import { useEffect, useState } from "react";
import { FavoriteMovies } from "../favorite-movies/favorite-movies";
import { UpdateUser } from "../update-user/update-user";
import { Card, Button, ImagePath } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, movies, onMovieClick }) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [userProfile, setUserProfile] = useState(user);
  const [userUpdate, setUserUpdate] = useState(false);

  useEffect(() => {
    setFavoriteMovies(user.FavoriteMovies);
  }, [user]);

  const handleUpdate = () => {
    setUserUpdate(true);
  };

  return (
    <div className="profile-view">
      <h1>Profile</h1>
      <div className="username">
        <span className="label">Username: </span>
        <span className="value">{userProfile.Username}</span>
      </div>
      <div className="email">
        <span className="label">Email: </span>
        <span className="value">{userProfile.Email}</span>
      </div>
      <div className="birthday">
        <span className="label">Birthday: </span>
        <span className="value">{userProfile.Birthday}</span>
      </div>
      <div className="favorite-movies">
        <span className="label">Favorite Movies: </span>
        <FavoriteMovies movies={movies} favoriteMovies={favoriteMovies} />
      </div>
      <Button variant="primary" onClick={handleUpdate}>Update Profile</Button>
      {userUpdate && <UpdateUser user={userProfile} />}
    </div>
  );
}
