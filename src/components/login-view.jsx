import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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