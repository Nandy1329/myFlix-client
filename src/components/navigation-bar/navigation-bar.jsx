import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, query, handleSearch, onLoggedOut }) => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand as={Link} to="/">MyFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {user && (
                        <>
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                        </>
                    )}
                    {!user && (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </>
                    )}
                </Nav>
                {user && (
                    <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                            value={query}
                            onChange={handleSearch}
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavigationBar;
