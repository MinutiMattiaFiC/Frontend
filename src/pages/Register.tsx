import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react';


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
            setValidated(true);
        }

        setValidated(true);
    };


    return (
        <Stack gap={2} className="col-md-5 mx-auto">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Stack direction="horizontal" gap={3}>
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
                </Stack>
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

    );
}

export default Register;