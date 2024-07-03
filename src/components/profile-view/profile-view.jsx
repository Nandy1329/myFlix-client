import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container, Button, Card, Form } from "react-bootstrap";
import { PersonSquare } from "react-bootstrap-icons";
import { MovieCard } from "../movie-card/movie-card";
import moment from "moment"; // Make sure moment library is imported

const ProfileView = ({ user, movies, setUser, removeFav, addFav }) => {
  const [username, setUsername] = useState(user.Username || "");
  const [email, setEmail] = useState(user.Email || "");
  const [birthday, setBirthday] = useState(user.Birthday || "");

  const navigate = useNavigate();

  // Ensure movies and user.FavoriteMovies are defined
  if (!movies || !user || !user.FavoriteMovies) {
    console.error("Movies or User or User's FavoriteMovies are undefined");
    return null; // or handle loading state appropriately
  }

  const favoriteMovieList = movies.filter((m) =>
    user.FavoriteMovies.includes(m._id)
  );

  const token = localStorage.getItem("token");

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          const updatedUser = await response.json();
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          alert("Update was successful");
        } else {
          alert("Update failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = () => {
    fetch(
      `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setUser(null);
          alert("User has been deleted");
          localStorage.clear();
          navigate("/");
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={4} className="text-center text-md-start ms-3">
          <Card>
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <PersonSquare
                variant="top"
                color="orange"
                className="my-4"
                size={180}
              />
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Card.Text>
                Birthday:{" "}
                {user.Birthday
                  ? moment(user.Birthday).utc().format("YYYY-MM-DD")
                  : ""}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className="mt-5">
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                className="mb-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                className="mb-3"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                className="mb-2"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="mt-3 me-2">
              Update
            </Button>
            <Button
              onClick={handleDelete}
              className="mt-3 bg-danger border-danger text-white"
            >
              Delete User
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
        <Row className="justify-content-center">
          {favoriteMovieList.length !== 0 ? (
            favoriteMovieList.map((movie) => (
              <Col
                sm={7}
                md={5}
                lg={3}
                xl={2}
                className="mx-2 mt-2 mb-5 col-6 similar-movies-img"
                key={movie._id}
              >
                <MovieCard
                  movie={movie}
                  removeFav={removeFav}
                  addFav={addFav}
                  isFavorite={user.FavoriteMovies.includes(movie._id)}
                />
              </Col>
            ))
          ) : (
            <Col>
              <p>There are no favorite movies</p>
            </Col>
          )}
        </Row>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  setUser: PropTypes.func.isRequired,
  removeFav: PropTypes.func.isRequired,
  addFav: PropTypes.func.isRequired,
};

export default ProfileView;

