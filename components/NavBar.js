import React from 'react';
import Link from 'next/link';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar bg="purple" variant="dark">
      <Container>
        <Nav className="me-auto">
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <SearchBar />
            <Link passHref href="/profile">
              <Navbar.Brand className="navbar-brand">
                <Image src={user.photoURL} alt="userURL" width="40%" height="40%" />
              </Navbar.Brand>
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}
