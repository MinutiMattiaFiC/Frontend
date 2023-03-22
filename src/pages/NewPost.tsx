import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from "axios";

function NewPostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const api_token = localStorage.getItem('accessToken');
    const onClick = () =>{
        axios.post('http://localhost:8252/posts', {
            title: title,
            content: content,
            api_token :api_token,
        }).then((response) => {
            window.location.href = '/posts';
        }, (error) => {
            console.log(error);
        });
    };

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Post title</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={onClick}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default NewPostPage;
