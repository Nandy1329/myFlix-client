import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useState } from "react";


export const MovieCard = ({ movieData, user, onFavoritesUpdate }) => {
  // State to track whether the movie is in favorites
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem('token');

  // Function to toggle favorite status
  const toggleFavorite = async (event) => {
    event.preventDefault();

    const methodType = isFavorite ? "DELETE" : "POST";

    fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user._id}/${movieData._id}`, {
      method: methodType,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          onFavoritesUpdate(updatedUser);
          setIsFavorite(!isFavorite);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      })
  };

  useEffect(() => {
    // Check local storage for favorite status on component mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.Movies) {
      const storedFavorites = storedUser.Movies;
      if (storedFavorites.includes(movieData._id)) {
        setIsFavorite(true);
      }
    }
  }, [movieData._id]);
  return (
    <Card className="h-100 bg-secondary bg-gradient text-light shadow" border="dark">
      <Button variant="link" onClick={toggleFavorite} className="ms-2" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
      </Button>
      <Card.Img variant="top" src={movieData.ImagePath} />
      <Card.Body>
        <div>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
        </div>
        <div className="mt-4 text-center">
          <Link to={`/movies/${encodeURIComponent(movieData._id)}`}>
            <Button variant="primary">Open</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
    })
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onFavoritesUpdate: PropTypes.func.isRequired
}
