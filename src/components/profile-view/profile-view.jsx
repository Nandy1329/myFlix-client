// src/components/profile-view/profile-view.jsx
import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Card, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import UserInfo from "./user-info";
import { FavoriteMovies } from "./favorite-movies"; // Assuming you have a default export
import UpdateUser from "./update-user";
import axios from "axios";

const ProfileView = ({ user, movies, removeFav, setUser }) => {
  const handleUpdate = async (updatedUser) => {
    let token = localStorage.getItem("token");
    const url = `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}`;

    axios
      .put(
        url,
        {
          Username: updatedUser.Username,
          Password: updatedUser.Password,
          Email: updatedUser.Email,
          Birthday: updatedUser.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const updatedUser = response.data;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success("Profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile");
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <UserInfo email={user.Email} name={user.Username} birthday={user.Birthday} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <Card>
            <Card.Body>
              <h3>Update Profile</h3>
              <UpdateUser user={user} handleUpdate={handleUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={12}>
          <Card>
            <Card.Body>
              <FavoriteMovies user={user} movies={movies} removeFav={removeFav} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  removeFav: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default ProfileView;
