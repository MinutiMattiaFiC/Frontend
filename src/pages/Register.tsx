import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import axios from 'axios';


function Register() {
    const [validated, setValidated] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);


    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        // Controlla se le password coincidono
        const password = form.elements.formBasicPassword.value;
        const confirmPassword = form.elements.formBasicPasswordConf.value;
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            setValidated(false); // Imposta validated su false per visualizzare il feedback di errore
            event.preventDefault();
            event.stopPropagation();
        } else {
            setPasswordsMatch(true);
            if (form.checkValidity() && passwordsMatch) {
                const first_name = form.elements['formBasicFirstName'].value;
                const last_name = form.elements['formBasicLastName'].value;
                const email = form.elements['formBasicEmail'].value;
                const password = form.elements['formBasicPassword'].value;

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
        }

    }



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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Stack>
        </Container>
    );
}

export default Register;
