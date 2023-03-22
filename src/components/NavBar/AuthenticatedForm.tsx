import React, {useState} from 'react';
import {Form, Button, Toast} from 'react-bootstrap';
import useToken from "../hooks/useToken";
import axios from "axios";
import {Post, User} from "../interface/types";
import Container from "react-bootstrap/Container";
import ToastContainer from 'react-bootstrap/ToastContainer'
interface IAUthForm {
    children: any;
}

const AuthenticatedForm : React.FC<IAUthForm> = ({children}) => {
    const api_token = useToken();
    const [content, setContent] = useState("");
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [showB, setShowB] = useState(false);
    const toggleShowB = () => setShowB(!showB);
    if (!api_token) {
        return null; // Se il token non è presente, il form non viene mostrato
    }
    const onClick = () =>{
        axios.post('http://localhost:8252/comments', {
            content: content,
            api_token :api_token,
            post_id : children?.id
        }).then((response) => {
            setShowA(true)
        }, (error) => {
            setShowB(true)
        });
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="ControlTextarea">
                    <Form.Label>Leave a comment</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={onClick} >
                    Submit
                </Button>
            </Form>
            <ToastContainer className="p-3" position={'top-start'} containerPosition={'absolute'}>
                <Toast
                    bg = 'success'
                    delay={3000} autohide
                    show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                        <strong className="me-auto">Success!</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>Comment added</Toast.Body>
                </Toast>
                <Toast
                    bg = 'danger'
                    delay={3000} autohide
                    show={showB} onClose={toggleShowB}>
                    <Toast.Header>
                        <strong className="me-auto">Error!</strong>
                        <small>just now</small>
                    </Toast.Header>
                    <Toast.Body>Something goes wrong</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default AuthenticatedForm;
