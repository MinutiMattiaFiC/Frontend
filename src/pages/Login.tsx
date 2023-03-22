import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import Toast from "../components/Obj/Toast";
import {ToastContainer} from "react-bootstrap";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [message, setMessage] = useState("");

    const onClick = () =>{
        axios.post('http://localhost:8252/auth/login', {
            email: email,
            password: password
        }).then((response) => {
            localStorage.setItem('accessToken', response.data.data.token);
            window.location.href = '/posts';
        }, (error) => {
            setShowA(true)
            setMessage(" 422 Unprocessable Content ");
        });
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Enter password"
                        pattern=".{8,}"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={onClick}>
                    Submit
                </Button>
                <ToastContainer className="p-3" position={'top-start'} containerPosition={'absolute'}>
                    <Toast
                        showA={showA}
                        toggleShowA={toggleShowA}
                        message={message}
                        status={'danger'}
                    ></Toast>
                </ToastContainer>
            </Form>
        </Container>
    );
}

export default LoginPage;
