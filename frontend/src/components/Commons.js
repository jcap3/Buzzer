import Modal from 'react-bootstrap/Modal'
import React from 'react'
import Button from "react-bootstrap/Button";

export default class Commons {
    static dataToSendBuilder = (messageType, content = null) => {
        let data = {
            'messageType': messageType,
            'content': content
        };
        console.log(JSON.stringify(data));
        return JSON.stringify(data);
    };

    static showModal = (title, message, isShow, handleClose) => {
        return (
            <Modal show={isShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}