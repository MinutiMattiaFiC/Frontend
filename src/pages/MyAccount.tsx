import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import useUser from "../components/hooks/useUser";

const MyAccount = () => {
    const user = useUser()
    return (
        <Container>
            <Row>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>My Account</Card.Title>
                            <Card.Text>
                                <strong>First name:</strong>{user.first_name}<br />
                                <strong>Last name:</strong> {user.last_name}<br />
                                <strong>Email:</strong> {user.email}<br />
                                <strong>Address:</strong> {user.subscription}<br />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default MyAccount;
