import React from 'react';
import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row className="mt-5" justify-content-center>
      <Col md={5} >
        <img src={movie.Image} alt="movie-poster" className="img-fluid"/>
      </Col>
      <Col md={3}>
        <div className="movie-view">
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <div className="movie-bio">
            <span className="label">Bio: </span>
            <span className="value">{movie.Director.Bio}</span>
          </div>
          <div className="movie-birth">
            <span className="label">Born: </span>
            <span className="value">{movie.Director.Birth}</span>
          </div>
          <Button onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </Col>
    </Row>
  );
}