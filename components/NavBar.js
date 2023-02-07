import React from 'react';
import Link from 'next/link';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="purple" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <SearchBar />
            <Link passHref href="/profile">
              <Navbar.Brand className="navbar-brand" style={{ marginLeft: '450px' }}>
                <Image src={user.photoURL} alt="userURL" width="40%" height="40%" id="navbar-profile-image" />
              </Navbar.Brand>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
