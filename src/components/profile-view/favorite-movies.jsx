import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = ({ movies, user }) => {
  if (!movies || !user || !user.FavoriteMovies) {
    return <div>No favorite movies available</div>;
  }

  // Ensure that movies is an array
  if (!Array.isArray(movies)) {
    return <div>Invalid movies data</div>;
  }

  let favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie.id)
  );

function FavoriteMovies({ favoriteMovieList }) {
  const removeFav = (id) => {
    let token = localStorage.getItem("token");
    let url = 'https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/' + localStorage.getItem('user') + '/movies/' + id;
    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  return (
    <div>
      <h2>Favorite Movies</h2>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
}