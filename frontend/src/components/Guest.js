import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Commons from './Commons'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Guest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.ws = this.props.websocket;
    }

    componentDidMount() {
        this.ws.addEventListener("message", e => {
            let data = JSON.parse(e.data);
            if (data.messageType === 'JOINGAME')
                console.log();
            // this.setState({gameCode : data.content});                
        });
        this.ws.send(Commons.dataToSendBuilder('JOINGAME', {
            'guestName': this.props.guestName,
            'gameCode': this.props.guestGameCode
        }));
    }

    guestJumboTronMessage = () => {
        return (
            <React.Fragment>
                <h1>
                    Joined Game Code: <Badge variant='info'>{this.props.guestGameCode}</Badge>
                </h1>
                <p>Display Name: {this.props.guestName}</p>
                <div>
                    <span>Waiting for host to start</span>
                    <Spinner animation='grow' />
                </div>
            </React.Fragment>
        )
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Jumbotron>
                            {this.guestJumboTronMessage()}
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}