import React from "react";
import PropTypes from "prop-types";
import { Col, Row, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import UserInfo from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import UpdateUser from "./update-user";
import axios from "axios";

const ProfileView = ({ user, movies, removeFav, setUser }) => {
  const handleUpdate = async (updatedUser) => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}`;

      const response = await axios.put(url, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUserData = response.data;
      setUser(updatedUserData);
      localStorage.setItem("user", JSON.stringify(updatedUserData));
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error.response || error.message);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} className="mb-4">
          <UserInfo user={user} onUpdateUser={handleUpdate} />
        </Col>
        <Col xs={12}>
          <FavoriteMovies movies={movies} user={user} removeFav={removeFav} />
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