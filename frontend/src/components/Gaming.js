import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import bulb_on from '../pic_bulbon.gif'
import bulb_off from '../pic_bulboff.gif'
import Image from 'react-bootstrap/Image'
import Commons from './Commons'
import Button from "react-bootstrap/Button";

export default class Gaming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
        this.ws = this.props.websocket;
    }

    guestsBuzzHandler = (e) => {
        this.ws.send(Commons.dataToSendBuilder('BUZZ'));
    }

    componentDidUpdate() {
        console.log('component did update')
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>Game Session: {this.props.gameCode}</Card.Header>
                            <Card.Body className="text-center">
                                <Image src={this.props.theBuzzer === '' ? bulb_off : bulb_on} />
                                <Card.Text>                                
                                    First to click: {this.props.theBuzzer}
                                    <br></br>
                                    {this.props.isHost && 
                                        <React.Fragment>
                                            <Button variant='primary' onClick={this.props.startButtonHandler}>Start</Button>
                                            <Button variant='primary' onClick={this.props.resetButtonHandler}>Reset</Button>
                                        </React.Fragment>
                                    }
                                </Card.Text>
                                <Card>
                                    <Card.Header>Players</Card.Header>
                                    <Card.Body>
                                        {
                                            this.props.isHost ? Commons.displayCardsIn4ColsFormat(this.props.guests, this.guestsBuzzHandler, 'host', false) :
                                                Commons.displayCardsIn4ColsFormat(this.props.guests, this.guestsBuzzHandler, this.props.myName, this.props.buzzingStart)
                                        }
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

}