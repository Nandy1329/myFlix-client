import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';
import { UpdateUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';

export const ProfileView = ({ user, movies, token }) => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState([]); 

    useEffect(() => {
        if (user) {
            setUsername(user.Username || '');
            setEmail(user.Email || '');
            setBirthday(user.Birthday || '');
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Row>
                <Col xs={12} md={4}>
                    <Card>
                        {/* Placeholder image */}
                        <Card.Img src="holder.js/171x180" /> 
                        <Card.Body>
                            <Card.Title><h2>My Profile</h2></Card.Title>
                            <Card.Text>
                                <div>
                                    <h4>{userName}</h4>
                                    <h4>{email}</h4>
                                    <h4>{birthday}</h4>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={8}>
                    <UpdateUser
                        formData={{ userName, email, birthday, password }}
                        handleUpdate={(e) => handleUpdate(e)}
                        handleSubmit={(e) => handleSubmit(e)}
                    />
                </Col>
            </Row>
            <br />
            <hr />
            <br />
            <Row>
                <Col className="mb-5" xs={12} md={8}>
                    {/* Pass favoriteMovies and setFavoriteMovies to FavoriteMovies component */}
                    <FavoriteMovies
                        user={user}
                        favoriteMovies={favoriteMovies}
                        setFavoriteMovies={setFavoriteMovies}
                    />
                </Col>
            </Row>
        </div>
    );
};

ProfileView.propTypes = {
    user: PropTypes.object,
    movies: PropTypes.array,
    token: PropTypes.string
};
export default ProfileView;