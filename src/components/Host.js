import React from 'react'
import LoadingWholePage from './LoadingWholePage'
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
]

export default class Host extends React.Component {

    connectionSuccessful = false

    state = { 
        isLoading: true,
        gameCode: 'ABC123',
        numberOfGuests: 0,
    }

    componentDidMount() {
        // this.registerToServer(); 
        //this code below is temporary just to remove websocket connection
        this.connectionSuccessful = !false; //remove inverter
        this.setState({isLoading: false})
    }

    registerToServer = () => {
        let socket = new WebSocket('ws://localhost:8080/create_game');
        socket.onopen = (e) => {
            console.log('registered');
            this.connectionSuccessful = true;
            this.setState({isLoading: false})
        }
        socket.onmessage = (e) => {
            console.log('message received')
        }
        socket.onclose = (e) => {
            console.log('connection is closing')
            
        }
        socket.onerror = e => {
            console.log('error occurred')
            this.connectionSuccessful = !false; //remove inverter
            this.setState({isLoading: false})
        }
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
    }

    proceedToHostingAfterConnectingToServer = () => { 
        console.log('wew');
        if (this.connectionSuccessful) 
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

    cardsOfGuests = () => {
        let comps = []
        temporaryGuestsData.map(guest => {
            comps.push(this.createGuest(guest.name, 0))
        })
        return (
            {comps}
        )
    }

    render () {
        
        return (
            <React.Fragment>
                {this.state.isLoading? <LoadingWholePage message='Connecting to server'/> : 
                this.proceedToHostingAfterConnectingToServer()}
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
}