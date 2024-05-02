import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";

export const ProfileView = ({ movies }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const isoDate = new Date(birthday);

    const updatedUserData = {
      UserName: username,
      Email: email,
      Birthday: isoDate,
      Password: password
    };
    
    fetch(`https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedUserData),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  let favoriteMovies = [];
  if (user) {
    favoriteMovies = movies.filter((m) => user.FavoriteMovies.includes(m._id));
  }

  useEffect(() => {
    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Failed to fetch user data');
        }
      }) 
      .then((data) => {
        setUser(data);
        setUsername(data.Username);
        setEmail(data.Email);
        // Set other state variables as needed
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Row>
      <Col>
        <h2> My Profile </h2>
        <p>User: {user && user.Username}</p>
        <p>Email: {user && user.Email}</p>
      </Col>
      <Col md={4}>
        <FavoriteMovies favoriteMovies={favoriteMovies} />
      </Col>
      <Col>
        <UpdateUser 
          username={username} 
          email={email} 
          password={password} 
          birthday={birthday} 
          setUsername={setUsername} 
          setEmail={setEmail} 
          setPassword={setPassword} 
          setBirthday={setBirthday} 
          handleSubmit={handleSubmit} 
        />
      </Col>
    </Row>
  ); 
};

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired
};
export default ProfileView;