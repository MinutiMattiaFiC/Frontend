import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import React from "react";

function ModalComment(props:any) {
     return (
        <Container>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {props.content}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ModalComment;