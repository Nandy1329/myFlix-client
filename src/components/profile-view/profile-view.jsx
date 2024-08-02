import React, { useState } from "react";
import PropTypes from "prop-types";
import { Col, Row, Card } from "react-bootstrap";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateUser from "./update-user"; // Import the UpdateUser component

const ProfileView = ({ user, movies, removeFav, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [password, setPassword] = useState("");

  const handleUpdate = async (updatedUser) => {
    let token = localStorage.getItem("token");
    const url = `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}`;

    axios
      .put(
        url,
        {
          Username: updatedUser.Username,
          Password: password,
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
    <Row>
      <Col xs={12} md={6}>
        <Card>
          <Card.Body>
            <UserInfo email={user.Email} name={user.Username} birthday={user.Birthday} />
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={6}>
        <FavoriteMovies user={user} movies={movies} removeFav={removeFav} />
      </Col>
      <Col xs={12} md={6}>
        <Card>
          <Card.Body>
            <h3>Update Profile</h3>
            <UpdateUser user={user} handleUpdate={handleUpdate} /> {/* Use UpdateUser component */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired,
  removeFav: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default ProfileView;