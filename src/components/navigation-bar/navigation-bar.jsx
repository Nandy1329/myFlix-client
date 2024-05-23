import React from "react";  
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";
import { SearchBar } from "../search-bar/search-bar";
import { Container, Navbar, Nav, Form, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

export const NavigationBar = ({user, query, movies, handleSearch, onLoggedIn, onLoggedOut}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">MyFlix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/movies">Movies</Nav.Link>
          <Nav.Link href="/profile">Profile</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
        <Form inline>
          <SearchBar query={query} handleSearch={handleSearch} />
          {user ? (
            <Button variant="primary" onClick={onLoggedOut}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          )}
        </Form>
      </Navbar.Collapse>
    </Navbar>

    
  );
}