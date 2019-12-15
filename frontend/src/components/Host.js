import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Commons from './Commons'
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

export default class Host extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
            isShowWarningModal: false,
            isStarted: false
        };
        this.ws = this.props.websocket;
        this.gameCode = this.props.gameCode;
    }

    hostJumboTronMessage = () => {
        return (
            <React.Fragment>
                <h1>
                    Game Code: <Badge variant='info'>{this.gameCode}</Badge>
                </h1>
                <p>This code will be used by guests who want to join your game.</p>
                <div>
                    <span>Accepting incoming guests</span>
                    <Spinner animation='grow' />
                </div>
                <Button style={{ marginTop: 10 + 'px' }} variant='primary' onClick={this.handleStartGameClick}>Start
                    Game</Button>
            </React.Fragment>
        )
    };

    handleStartGameClick = () => {
        if (this.props.guests.length <= 1)
            this.setState({ isShowWarningModal: true });
        else {
            this.ws.send(Commons.dataToSendBuilder('HOST_START_GAME'));
            this.setState({ isStarted: true })
        }
    };

    handleModalClose = () => {
        this.setState({ isShowWarningModal: false })
    };

    hostView = () => {    
        return (
            <Container>
                <Row>
                    <Col>
                        <Jumbotron>
                            {this.hostJumboTronMessage()}
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card border='primary'>
                            <Card.Header>
                                Current Guests: {this.props.guests.length}
                            </Card.Header>
                            <Card.Body>
                                {Commons.displayCardsIn4ColsFormat(this.props.guests, undefined, 'host')}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {Commons.showModal('Buzzer', 'Failed to start game. Not enough players.', this.state.isShowWarningModal, this.handleModalClose)}
            </Container>
        )

    };

    render() {
        return (
            <React.Fragment>
                {this.state.isStarted ? <Redirect push to={`/gaming/${this.gameCode}`} /> : this.hostView()}
            </React.Fragment>
        )
    }
}

