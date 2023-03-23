import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import React, {useCallback} from "react";
import useApi from "../hooks/useApi";
import axios from "axios";
import useToken from "../hooks/useToken";

function ModalComment(props:any) {
    const {fetchDelete} = useApi()
    const handleDelete = () => {
        fetchDelete(`${props.url}`).then((response) => {
            props.onDelete(props.comment)
        })
    }



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
                    <Button onClick={props.onHide}>No, close</Button>
                    <Button variant="danger" onClick={handleDelete}>Yes, delete</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ModalComment;