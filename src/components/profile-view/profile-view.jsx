import { AccountDetails } from "./account-details";
import { FavoriteMovies } from "./favorite-movies";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const ProfileView = ({ user, movies, onAccountUpdate, onFavoritesUpdate: onFavoritesUpdate }) => {
  const favoriteMovieList = movies.filter(m => userFavoriteMovies.includes(m._id));

  return (
    <Container>
      <Row>
        <Col md={6}>
          <h2>Account Information</h2>
          <AccountDetails user={user} onAccountUpdate={onAccountUpdate} />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FavoriteMovies favoriteMovieList={favoriteMovieList} user={user} onFavoritesUpdate={onFavoritesUpdate} />
        </Col>
      </Row>
    </Container>
  )
};