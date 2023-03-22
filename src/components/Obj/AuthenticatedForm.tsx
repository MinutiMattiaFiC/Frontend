import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import useToken from "../hooks/useToken";
import axios from "axios";
import Container from "react-bootstrap/Container";
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from "./Toast";
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
                    showA={showA}
                    toggleShowA={toggleShowA}
                    message={"Comment added"}
                    status={'success'}
                ></Toast>
                <Toast
                    showA={showB}
                    toggleShowA={toggleShowB}
                    message={"Something goes wrong"}
                    status={'danger'}
                ></Toast>
            </ToastContainer>
        </Container>
    );
}

export default AuthenticatedForm;
