import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useApi from "../hooks/useApi"
function ModalEditComment(props : any) {
    const [content , setContent] = useState(props.element.content);

    const {fetchPut} = useApi()

    const handleEdit = () => {
        props.element.content = content
        fetchPut(`${props.url}`, {
            content : content
        }).then(
            props.onEdit(props.element)
        );
    }
    const handleEditAndHide = () => {
        handleEdit();
        props.onHide();
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="TextAreaEditComment"
                        >
                            <Form.Control as="textarea" rows={3}
                                          value={content}
                                          onChange={(e) => setContent(e.target.value)}
                                          />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditAndHide}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditComment;