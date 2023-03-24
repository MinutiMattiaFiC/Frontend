import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Toast from "../components/Obj/Toast";
import {ToastContainer} from "react-bootstrap";
import useApi from "../components/hooks/useApi";
import {Link, useNavigate} from "react-router-dom";
import Stack from "react-bootstrap/Stack";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showA, setShowA] = useState(false);
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate()
    const toggleShowA = () => setShowA(!showA);
    const [message, setMessage] = useState("");

    const {fetchPost} = useApi()
    const onClick = (event:any) => {
        const form = event.currentTarget.form;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            event.preventDefault();
            setValidated(true);
            fetchPost('auth/login',{
                email: email,
                password: password
            }).then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data.data));
                return(navigate('/posts', { replace: true }))
            }, (error) => {
                setShowA(true)
                setMessage(" 422 Unprocessable Content ");
            });
        }
    };

    return (
        <Container>
            <Form noValidate validated={validated} onSubmit={onClick}>
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
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email address.
                    </Form.Control.Feedback>
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
                    <Form.Control.Feedback type="invalid">
                        Please provide a password with at least 8 characters.
                    </Form.Control.Feedback>
                </Form.Group>

                <Stack direction="horizontal" gap={3}>
                    <Button variant="primary" onClick={onClick}>
                        Submit
                    </Button>
                    <Link to={'../auth/register'}>
                        <Button variant="primary" >
                            Register
                        </Button>
                    </Link>
                </Stack>
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
