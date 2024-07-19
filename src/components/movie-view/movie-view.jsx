import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((movie) => movie._id === movieId);

    if (!movie) {
        return <div>Loading...</div>; // Handle case where movie with movieId is not found
    }

    const { Title, Description, Genre, Director, Year, ImagePath } = movie;

    return (
        <Row className="my-5 justify-content-md-center">
            <Col md={7} className="col-12">
                <img src={ImagePath} alt="movie cover" className="mx-auto w-100" />
            </Col>
            <Col md={5} className="col-12">
                <div className="my-1">
                    <span className="h1">{Title}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Description: </span>
                    <span>{Description}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Director: </span>
                    {/* Check if Director exists before accessing Name */}
                    <span>{Director ? Director.Name : 'N/A'}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Genre: </span>
                    {/* Check if Genre exists before accessing Name */}
                    <span>{Genre ? Genre.Name : 'N/A'}</span>
                </div>
                <div className="my-1">
                    <span className="h6">Year: </span>
                    <span>{Year}</span>
                </div>
                <Button className="my-2 me-2">Add to Favorite</Button>
                <Link to={`/`}>
                    <Button className="my-2">Back</Button>
                </Link>
            </Col>
        </Row>
    );
};