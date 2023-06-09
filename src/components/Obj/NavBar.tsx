import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

function NavBar() {

    return (
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Link to="/posts">
                        <Navbar.Brand >Home</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Link to="/auth/login">
                            <Navbar.Brand
                                style={{padding:'10px'}}
                            >
                                <FontAwesomeIcon icon={faUser} />
                            </Navbar.Brand>
                        </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }


export default NavBar;