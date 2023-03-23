import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import useToken from "../hooks/useToken";
import axios from "axios";
import Container from "react-bootstrap/Container";
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from "./Toast";
import useApi from "../hooks/useApi";

const FormAddComment  = (props : any) => {

    const [content, setContent] = useState("");
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [showB, setShowB] = useState(false);
    const toggleShowB = () => setShowB(!showB);
    const {fetchPost} = useApi()
    const onClick = () =>{
        fetchPost('comments',{
            content: content,
            post_id : props.postId
        }).then((response) => {
            setContent("")
            setShowA(true)
            props.onSave(response.data.data)
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

export default FormAddComment;
