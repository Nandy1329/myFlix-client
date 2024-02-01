import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import "./index.scss";
import { MainView } from './components/main-view/main-view';

const MyFlixApp = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch your movies here, set them with setMovies
    // This is just a placeholder, replace with your actual fetch call
    fetch('/MyFlixApp/movies')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="my-flix">
      <div>Welcome to myFlix app!</div>
      <MainView movies={movies} />
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApp />);