import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './App.css'; // Assuming you have custom styles here

function NavBar() {
    const [activeLink, setActiveLink] = useState('');

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    };

    return (
        <Navbar expand="lg" className="navbar-custom">
            <Container>
                {/* Brand */}
                <Navbar.Brand as={Link} to="/home" className="navbar-logo">
                    RockStore
                </Navbar.Brand>

                {/* Toggle Button for Small Screens */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: 'white' }} />

                {/* Collapsible Navbar */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto mx-auto">
                        <Nav.Link
                            as={Link} // Use Link for navigation
                            to="/home" // Set the path to "/home"
                            className={activeLink === "home" ? "active navbar-link" : "navbar-link"}
                            onClick={() => onUpdateActiveLink('home')}>
                            Home
                        </Nav.Link>
                        <Nav.Link
                            href="#services"
                            className={activeLink === "services" ? "active navbar-link" : "navbar-link"}
                            onClick={() => onUpdateActiveLink('services')}>
                            Services
                        </Nav.Link>
                        <Nav.Link
                            href="#products"
                            className={activeLink === "products" ? "active navbar-link" : "navbar-link"}
                            onClick={() => onUpdateActiveLink('products')}>
                            Products
                        </Nav.Link>
                        <Nav.Link
                            href="#about"
                            className={activeLink === "about" ? "active navbar-link" : "navbar-link"}
                            onClick={() => onUpdateActiveLink('about')}>
                            About
                        </Nav.Link>
                    </Nav>

                    {/* Contact Button */}
                    <Button href="#contact" className="contact-btn">
                        Contact
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
