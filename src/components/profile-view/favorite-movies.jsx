import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";
import { toast } from "react-toastify"; // Assuming you're using react-toastify

export const FavoriteMovies = ({ movies, user, removeFav }) => {
  if (!movies || !user || !user.FavoriteMovies) {
    return <div>No favorite movies available</div>;
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
        toast.success("Movie removed from favorites!");
        removeFav(id);
      })
      .catch((error) => {
        toast.error("Error removing movie from favorites.");
        console.error("Error removing movie from favorites:", error);
      });
  };

  return (
    <div>
      <h2>Favorite Movies</h2>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard
              movie={movie}
              onRemoveFromFavorites={() => removeFavHandler(movie._id)}
              isFavorite={true}
            />
          </Col>
        ))}
      </Row>
      {/* If you have a large number of favorite movies, consider adding pagination here */}
    </div>
  );
};

FavoriteMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  removeFav: PropTypes.func.isRequired,
};
