import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomNavBar from './CustomNavBar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ChoiceCard from './ChoiceCard'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Host from './Host'
import Guest from './Guest'
import LoadingWholePage from './LoadingWholePage'
import Commons from "./Commons";
import Gaming from './Gaming'

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            gameCode: 'ERROR',
            guests: [],
            isHost: false,
            gameStarted: false,
            myName: '',
            theBuzzer: '',
            buzzingStart: false
        };
        this.connectionSuccessful = false;
        this.ws = new WebSocket('ws://192.168.0.33:8080/buzzerqueue/connect');
        this.currentGuestName = '';
        this.currentGuestGameCode = '';
    }

    componentDidMount() {
        this.ws.onopen = (e) => {
            console.log('Connected to Server');
            this.setState({ isLoading: false });
        };
        this.ws.onmessage = (e) => {
            console.log(e.data);
            let data = JSON.parse(e.data);
            if (data.messageType === 'HOSTGAME') {
                this.setState({ gameCode: data.content, isHost: true });
            } else if (data.messageType === 'HOST_JOINGAME') {
                this.setState({ guests: data.content });
            } else if (data.messageType === 'HOST_START_GAME') {            
                this.setState({gameStarted: true, 
                    gameCode: data.content.gameCode, 
                    guests: data.content.guestNames, 
                    myName: data.content.myName})
            } else if (data.messageType === 'BUZZ') {
                this.setState({theBuzzer: data.content});
            } else if(data.messageType === 'HOST_RESET') {
                this.setState({theBuzzer: ''});
                this.setState({buzzingStart : false});
            } else if (data.messageType === 'HOST_START_BUZZER') {
                this.setState({buzzingStart : true});
            }


        };
        this.ws.onclose = (e) => {
            console.log('Disconnected from Server. ' + e.reason);
        };
        this.ws.onerror = e => {
            console.log('Error Occurred');
        }
    }

    appFrontMessage = () => {
        return (
            <React.Fragment>
                <h1>Select mode</h1>
                <p>
                    Enter as the host to create and manage a game.
                </p>
                <p>
                    Enter as guest and the one to press the buzzer!
                </p>
            </React.Fragment>
        )
    };

    resetButtonHandler = (e) => {
        this.ws.send(Commons.dataToSendBuilder('HOST_RESET'));        
    }

    startButtonHandler = (e) => {
        this.ws.send(Commons.dataToSendBuilder('HOST_START_BUZZER'));
    }

    handleClickForHostGame = e => {
        this.ws.send(Commons.dataToSendBuilder('HOSTGAME'));
    };

    handleChangeForName = e => {
        this.currentGuestName = e.target.value;
    };

    handleChangeForGameCode = e => {
        this.currentGuestGameCode = e.target.value;
    };

    main = () => {
        return (<React.Fragment>
            <Container>
                <Row >
                    <Col>
                        <Jumbotron >
                            {this.appFrontMessage()}
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ChoiceCard title='Host' form='host' handleClickForHostGame={this.handleClickForHostGame} />
                    </Col>
                    <Col>
                        <ChoiceCard title='Guest' form='guest'
                            handleChangeForName={this.handleChangeForName}
                            handleChangeForGameCode={this.handleChangeForGameCode}
                        />
                    </Col>
                </Row>
            </Container>
        </React.Fragment>)
    };

    hosting = () => {
        return (<Host websocket={this.ws} gameCode={this.state.gameCode} guests={this.state.guests} />)
    };

    guesting = () => {
        return (<Guest websocket={this.ws} guestName={this.currentGuestName} guestGameCode={this.currentGuestGameCode} />)
    };

    gaming = () => {
        return (
            <Gaming websocket={this.ws} 
            gameCode={this.state.gameCode} 
            guests={this.state.guests} 
            isHost={this.state.isHost} 
            myName={this.state.myName} 
            theBuzzer={this.state.theBuzzer}
            resetButtonHandler={this.resetButtonHandler}
            startButtonHandler={this.startButtonHandler}
            buzzingStart={this.state.buzzingStart}/>
        )
    };

    layoutContent = () => {
        return (
            <React.Fragment>
                <div style={{ marginBottom: 10 + 'px' }}>
                    <CustomNavBar brand='DCAP Buzzer' />
                </div>
                <BrowserRouter>
                    {this.state.gameCode !== 'ERROR' && this.state.isHost && <Redirect push to='/host' />}
                    {this.state.gameStarted === true && !this.state.isHost && <Redirect push to ={`/gaming/${this.state.gameCode}`}/>}
                    <Route exact path='/' component={this.main} />
                    <Route exact path='/host' component={this.hosting} />
                    <Route exact path='/guest' component={this.guesting} />
                    <Route exact path={`/gaming/${this.state.gameCode}`} component={this.gaming} />
                </BrowserRouter>
            </React.Fragment>
        )
    };

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading ? <LoadingWholePage message='Connecting to server' /> : this.layoutContent()}
            </React.Fragment>
        )
    }
}
//todo implement buzzing