// src/components/update-user/update-user.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateUser = ({ user, handleUpdate }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You are not authorized');
      return;
    }

    const updatedUser = {
      Username: username,
      Email: email,
      Birthday: birthday,
      Password: password,
    };

    const url = `https://myflixdb1329-efa9ef3dfc08.herokuapp.com/users/${user.Username}`;

    axios
      .put(url, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const updatedUser = response.data;
        handleUpdate(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">Birthday</label>
        <input
          type="date"
          className="form-control"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Profile</button>
    </form>
  );
};

UpdateUser.propTypes = {
  user: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default UpdateUser;