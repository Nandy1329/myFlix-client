
import Button from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MovieView = ({ movie, onBackClick }) => {
  if (!movie) return null;
  return (
 <Row className="movie-view justify-content-md-center">
    <Col md={8}>
      <img src={movie.ImagePath} alt="movie poster" class name="img-fluid"/>
    </Col>
    <Col md={3}>
      <div className="m-1">
        <span className="h6">Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div className="m-1">
        <span className="h6">Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div className="m-1">
        <span className="h6">Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div className="m-1-genre">
        <span className="h6">Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <Button onClick={onBackClick} variant="link">Back</Button>
            </Col>
        </Row>
    );
};