import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card.jsx';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser:null);
    const [token, setToken] = useState(storedToken? storedToken:null);
    const [movies, setMovies] = useState ([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { 
      access: username,
      secret: password,
    };

    fetch("https://myflixdb1329-efa9ef3dfc08.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json()) 
    .then((data) => 
    {
      console.log("login response", data)
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.user);
        onLoggedIn(data.user, data.token);
      } else {
        setError("No such user exists. Please try again or sign up.");
      }
    })
    .catch((e) => {
      setError("Something went wrong. Please try again.");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      {error && <div>{error}</div>}
      <button type="submit">Submit</button>
    </form>
  );  
}