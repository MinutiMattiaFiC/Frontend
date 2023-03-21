import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from "axios";

const LoginPage: React.FC = () => {
    const [validated, setValidated] = useState(false);
    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        const {elements} = form;

        if (form.checkValidity()) {
            const first_name = elements['formBasicFirstName'].value;
            const last_name = elements['formBasicLastName'].value;
            const email = elements['formBasicEmail'].value;
            const password = elements['formBasicPassword'].value;

            const data = { first_name, last_name, email, password };

            axios.post('http://localhost:8252/auth/register', data, {
                headers: { 'Content-Type': 'application/json' },
            })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        setValidated(true);


    };

    return (
        <Container className="my-5">
        <h1 className="mb-4">Login</h1>
            <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email"  />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  />
    </Form.Group>

    <Button variant="primary" type="submit">
        Submit
        </Button>
        </Form>
        </Container>
);
};

export default LoginPage;
