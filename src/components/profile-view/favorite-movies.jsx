import React from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user, removeFav }) => {
  if (!movies || !user || !user.FavoriteMovies) {
    return <div>No favorite movies available</div>;
  }

  if (!Array.isArray(movies)) {
    return <div>Invalid movies data</div>;
  }

  let favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie._id)
  );

  const removeFavHandler = (id) => {
    let token = localStorage.getItem("token");
    let url = `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}/movies/${id}`;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        removeFav(id);
      })
      .catch((error) => {
        console.error("Error removing movie from favorites:", error);
      });
  };

  return (
    <div>
      <h2>Favorite Movies</h2>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} removeFav={() => removeFavHandler(movie._id)} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
