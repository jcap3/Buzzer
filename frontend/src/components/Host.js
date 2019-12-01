import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Commons from './Commons'

export default class Host extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameCode: 'ERROR',
            guests: [],
        };
        this.ws = this.props.websocket;
    }

    componentDidUpdate() {
        console.log('host component update');
    }

    componentDidMount() {
        console.log("host mount")
        this.ws.addEventListener("message", e => {
            let data = JSON.parse(e.data);
            if (data.messageType === 'HOSTGAME') {        
                this.setState({gameCode : data.content});                
            } else if(data.messageType === 'HOST_JOINGAME') {
                this.setState({guests : data.content});
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
                    <Spinner animation='grow' />
                </div>
            </React.Fragment>
        )
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
                            </Jumbotron >
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card border='primary'>
                                <Card.Header>
                                    Current Guests: {this.state.guests.length}
                                </Card.Header>
                                <Card.Body>
                                    {this.state.guests.map ((guest, i) => <CreateGuest name={guest.guestName} key={i}/>)}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
    };
              
    render () {
        return (
            <React.Fragment>
                {this.proceedToHostingAfterConnectingToServer()}
            </React.Fragment>
        )
    }
}

const CreateGuest = ({name, score}) => {
    return (
        <React.Fragment>
            <Card border='dark' style={{ width: 200 + 'px' }}>
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