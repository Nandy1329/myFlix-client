import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { SearchBar } from "../search-bar/search-bar";
import Logo from "../../../img/logo.png";
import {Container, Navbar, Nav, Form, Row, Col } from "react-bootstrap";
import {Routes, Route } from "react-router-dom";

export const NavigationBar = ({ user, query, movies, handleSearch, onLoggedOut }) => {

  return (
    <Navbar bg="light" expand="lg" className="bg-body-tertiary justify-content-between">
      <Container>
        {/* Logo and navigation links */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={Logo}
            width="40"
            height="40"
            className="d-inline-block me-2"
            alt="Logo"
          />{" "}
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Navigation links */}
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Movies
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
  
          {/* SearchBar component */}
          <Form inline>
            <Row>
              <Col xs="auto">
                <SearchBar
                  handleSearch={handleSearch}
                  query={query}
                  movies={movies}
                />
              </Col>
            </Row>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
