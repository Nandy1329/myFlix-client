import { Navbar, Container, Nav } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, handleSearchInput }) => {
  return (
    <Navbar collapseOnSelect expand="md" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="logo">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" className="login button">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="signup button">
                  Sign up
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form>
              <Form.Control
                id="search-bar"
                type="text"
                placeholder="Search by title"
                className="mr-sm-2 mx-2"
                onChange={handleSearchInput}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
