import React, {useState} from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import {Toast} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function Toasts(props:any) {
    return (
        <Container>
            <Toast
                bg ={props.status}
                delay={3000} autohide
                show={props.showA} onClose={props.toggleShowA}>
                <Toast.Header>
                    <strong className="me-auto">Success!</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </Container>
    );
}

export default Toasts;