import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'


let temporaryGuestsData = [
    {'name' : 'joshua'} ,
    {'name' : 'tae'},
    {'name' : 'somebody'}
];

export default class Host extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameCode: 'ERROR',
            numberOfGuests: 0,
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
            }
        });
        this.ws.send('HOSTGAME');
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
                                    Current Guests: {this.state.numberOfGuests}
                                </Card.Header>
                                <Card.Body>
                                    {temporaryGuestsData.map ((guest, i) => <CreateGuest name={guest.name} key={i}/>)}
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