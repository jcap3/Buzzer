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
import Image from "react-bootstrap/Image";
import bulb_on from '../pic_bulbon.gif'
import bulb_off from '../pic_bulbon.gif'
import {Redirect} from "react-router-dom";

export default class Host extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameCode: 'ERROR',
            guests: [],
            isShowWarningModal: false,
            isStarted: false
        };
        this.ws = this.props.websocket;
    }

    componentDidMount() {
        this.ws.addEventListener("message", e => {
            let data = JSON.parse(e.data);
            if (data.messageType === 'HOSTGAME') {
                this.setState({gameCode: data.content});
            } else if (data.messageType === 'HOST_JOINGAME') {
                this.setState({guests: data.content});
            }
        });
        this.ws.send(Commons.dataToSendBuilder('HOSTGAME'));
    }

    hostJumboTronMessage = () => {
        return (
            <React.Fragment>
                <h1>
                    Game Code: <Badge variant='info'>{this.state.gameCode}</Badge>
                </h1>
                <p>This code will be used by guests who want to join your game.</p>
                <div>
                    <span>Accepting incoming guests</span>
                    <Spinner animation='grow'/>
                </div>
                <Button style={{marginTop: 10 + 'px'}} variant='primary' onClick={this.handleStartGameClick}>Start
                    Game</Button>
            </React.Fragment>
        )
    };

    handleStartGameClick = () => {
        if (this.state.guests.length <= 1)
            this.setState({isShowWarningModal: true});
        else {
            this.setState({isStarted: true})
        }
    };

    handleModalClose = () => {
        this.setState({isShowWarningModal: false})
    };

    formatGuests = () => {
        let rows = [];
        let cols = [];
        this.state.guests.forEach((guest, i) => {
            cols.push(<Col key={i}><CreateGuest name={guest.guestName}/></Col>);
            if (((i === 0 ? 1 : i) % 4) === 0 || i === (this.state.guests.length - 1)) {
                console.log('index: ' + i.toString());
                rows.push(<Row key={i} style={{marginBottom: 10 + 'px'}}>{cols}</Row>);
                cols = [];
            }
        });
        return (
            <Container>
                {rows}
            </Container>
        );
    };

    proceedToHostingAfterConnectingToServer = () => {
        if (this.state.gameCode !== 'ERROR') {
            console.log(this.state.gameCode);
            console.log(this.state.guests);
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
                                    Current Guests: {this.state.guests.length}
                                </Card.Header>
                                <Card.Body>
                                    {this.formatGuests()}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {Commons.showModal('Buzzer', 'Failed to start game. Not enough players.', this.state.isShowWarningModal, this.handleModalClose)}
                </Container>
            )
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.state.isStarted? <Redirect push to={`/gaming/${this.state.gameCode}`}/> : this.proceedToHostingAfterConnectingToServer()}
            </React.Fragment>
        )
    }
}

const CreateGuest = ({name, score}) => {
    return (
        <React.Fragment>
            <Card border='dark' style={{width: 200 + 'px'}}>
                <Card.Header>
                    {name}
                </Card.Header>
                <Card.Body>
                    Score: {score}
                </Card.Body>
            </Card>
        </React.Fragment>
    )
};