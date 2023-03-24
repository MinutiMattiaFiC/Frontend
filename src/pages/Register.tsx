import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import useApi from "../components/hooks/useApi";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate()

    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [message, setMessage] = useState("");
    const {fetchPost} = useApi()
    const handleSubmit =  (event:any) => {
        const form = event.currentTarget.form;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            if(password === passwordConfirm){
                event.preventDefault();
                setValidated(true);
                setPasswordsMatch(true);
                fetchPost('auth/register',{
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password
                }).then((response) => {
                    localStorage.setItem('user', JSON.stringify(response.data.data));
                    return(navigate('/posts', { replace: true }))
                }, (error) => {
                    setShowA(true)
                    setMessage(" 422 Unprocessable Content ");
                });
            }else{
                setPasswordsMatch(false);
            }

        }
    };


    return (
        <Container>
        <Stack gap={2} className="col-md-5 mx-auto">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
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
                        Please provide a valid email.
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
                        isInvalid={!passwordsMatch && validated}
                    />
                    <Form.Control.Feedback type="invalid">
                        {passwordsMatch ? "Please provide a valid password. Min 8 length" : "Passwords do not match. Please try again."}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPasswordConf">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Confirm password"
                        pattern=".{8,}"
                        value={passwordConfirm}
                        onChange={(event) => setPasswordConfirm(event.target.value)}
                        isInvalid={!passwordsMatch && validated}
                    />
                    <Form.Control.Feedback type="invalid">
                        {passwordsMatch ? "Please provide a valid password. Min 8 length" : "Passwords do not match. Please try again."}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                        Min 8 lenght
                    </Form.Control.Feedback>
                </Form.Group>
                <Stack direction="horizontal" gap={3}>
                    <Button variant="primary" type={"button"}
                            onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Link to={`/auth/login`}>
                        <Button variant="primary">login</Button>
                    </Link>
                </Stack>
            </Form>
        </Stack>
        </Container>
    );
}

export default Register;
