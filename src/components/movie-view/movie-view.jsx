import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie.id === Number(movieId));

  const navigate= useNavigate();

  return (
    movie ? (
      <Row className="my-5 justify-content-center">
        <Col md={5}>
          <img src={movie.ImagePath} alt="movie cover" className="img-fluid" />
        </Col>
        <Col md={3}>
          <div className="my-1" m-3 mt-3>
            <span className="h1">{movie.Title}</span>
          </div>
          <div className="my-1">
            <span className="h6">Description: </span>
            <span>{movie.Description}</span>
          </div>
          <div className="my-1">
            <span className="h6">Director: </span>
            <span>{movie.Director.Name}</span>
          </div>
          <div className="my-1">
            <span className="h6">Genre: </span>
            <span>{movie.Genre.Name}</span>
          </div>
          <div className="my-1">
            <span className="h6">Year: </span>
            <span>{movie.Year}</span>
          </div>
          <Link to={`/`}>
          <Button className="mt-3 w-100 primaryButton" variant="primary" onClick={() => navigate(-1)}>Back</Button> 
          </Link>
        </Col>
      </Row>
    ) : (
      <div>Movie not found</div>
    )
  );
}

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      ImagePath: PropTypes.string,
      Title: PropTypes.string,
      Description: PropTypes.string,
      Director: PropTypes.shape({
        Name: PropTypes.string
      }),
      Genre: PropTypes.shape({
        Name: PropTypes.string
      }),
      Year: PropTypes.number
    })
  ).isRequired
};