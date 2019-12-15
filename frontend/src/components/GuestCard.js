import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const GuestCard = ({ name, buttonsCallback, userName, isStarted }) => {
    return (
        <React.Fragment>
            <Card border='dark' style={{ width: 200 + 'px' }}>
                <Card.Header>
                    {name}
                </Card.Header>
                <Card.Body>
                    {
                        buttonsCallback !== undefined  && userName === 'host' ? <Button variant='primary' id={name} onClick={buttonsCallback} disabled={!isStarted}>Buzz!</Button> :
                        name === userName ? <Button variant='primary' id={name} onClick={buttonsCallback} disabled={!isStarted}>Buzz!</Button> : <React.Fragment>:P</React.Fragment>
                    }
                </Card.Body>
            </Card>
        </React.Fragment>
    )
};

export default GuestCard;