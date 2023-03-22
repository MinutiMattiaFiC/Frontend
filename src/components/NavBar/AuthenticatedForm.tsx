import React, {useState} from 'react';
import {Form, Button, Toast} from 'react-bootstrap';
import useToken from "../hooks/useToken";
import axios from "axios";
import {Post, User} from "../interface/types";
import Container from "react-bootstrap/Container";

interface IAUthForm {
    children: any;
}

const AuthenticatedForm : React.FC<IAUthForm> = ({children}) => {
    const api_token = useToken();
    const [content, setContent] = useState("");
    const [showA, setShowA] = useState(true);
   const toggleShowA = () => setShowA(!showA);
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
            console.log(error);
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
            <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header>
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </Toast>
        </Container>
    );
}

export default AuthenticatedForm;
