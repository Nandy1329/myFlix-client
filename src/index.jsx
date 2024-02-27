import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view.jsx';
import "./index.scss";

const MyFlixApp = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://myflixdb1329-efa9ef3dfc08.herokuapp.com/movies')
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

// Render the MyFlixApp component in the 'root' div
ReactDOM.render(<MyFlixApp />, document.getElementById('root'));