import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">📚 FER202 React Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/layout" active={location.pathname === '/layout'}>Layout</Nav.Link>
            <Nav.Link as={Link} to="/forms" active={location.pathname === '/forms'}>Forms</Nav.Link>
            <Nav.Link as={Link} to="/components" active={location.pathname === '/components'}>Components</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
