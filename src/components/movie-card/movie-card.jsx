import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMMovieClick }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [addTitle, setAddTitle] = useState("");
  const [delTitle, setDelTitle] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user}/Movies/${movie._id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAddTitle(data.Title);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleDelete = (e) => {
    e.preventDefault();
    fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user}/Movies/${movie._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDelTitle(data.Title);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Card className="movie-card">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="link" onClick={handleAdd}>Add</Button>
        <Button variant="link" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
