import Modal from 'react-bootstrap/Modal'
import React from 'react'
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import GuestCard from './GuestCard';

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
    };

    static displayCardsIn4ColsFormat = (itemsArray, buttonsCallback, userName, isStarted) => {
        let rows = [];
        let cols = [];        
        itemsArray.forEach((item, i) => {
            cols.push(<Col key={i}><GuestCard name={item.guestName} buttonsCallback={buttonsCallback} userName={userName} isStarted={isStarted}/></Col>);
            if (((i === 0 ? 1 : i) % 4) === 0 || i === (itemsArray.length - 1)) {
                console.log('index: ' + i.toString());
                rows.push(<Row key={i} style={{ marginBottom: 10 + 'px' }}>{cols}</Row>);
                cols = [];
            }
        });
        return (
            <Container>
                {rows}
            </Container>
        );
    }
    
}