import { useParams } from "react-router";
import { Link } from "react-router-dom"
import { MovieCard } from "../movie-card/movie-card";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  const similarMovies = movies.filter((m) => {
    return (
      m.id !== movieId &&
      m.genre.some((genre) => movie.genre.includes(genre))
  )}
);

  return (
    <div>
      <div>
        <img height="300" src={movie.imagePath} />
        <div>
          <span>Title</span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Description</span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>Genre</span>
          <span>{movie.genre + " "}</span>
        </div>
        <div>
          <span>Director</span>
          <span>{movie.director}</span>
        </div>
        <div>
          <span>Year</span>
          <span>{movie.year}</span>
          <Link to={'/'}>
            <Button className="back-button" onClick={() => history.goBack()}>
              Back
            </Button>
          </Link>
        </div>
      </div>
      <Col className="mb-5">
        <br />
        <hr />
        <br />
        <h3>Similar Movies</h3>
        <Row>
          {similarMovies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4}>
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>
      </Col>
    </div>
  );
};  

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.array.isRequired,
};