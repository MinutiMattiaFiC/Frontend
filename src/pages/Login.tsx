import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Do something with email and password
    };

    return (
        <Container className="my-5">
        <h1 className="mb-4">Login</h1>
            <Form onSubmit={handleSubmit}>
    <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
    </Form.Group>

    <Button variant="primary" type="submit">
        Submit
        </Button>
        </Form>
        </Container>
);
};

export default LoginPage;
