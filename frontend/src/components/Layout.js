import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomNavBar from './CustomNavBar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ChoiceCard from './ChoiceCard'
import {BrowserRouter, Link, Redirect, Route, useHistory} from 'react-router-dom'
import Host from './Host'
import Guest from './Guest'
import LoadingWholePage from './LoadingWholePage'
import Commons from "./Commons";

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            gameCode: 'ERROR'
        };
        this.connectionSuccessful = false;
        this.ws = new WebSocket('ws://10.12.19.71:8081/buzzerqueue/connect');
        this.currentGuestName = '';
        this.currentGuestGameCode = '';

    }

    componentDidMount() {
        this.ws.onopen = (e) => {
            console.log('Connected to Server');
            this.setState({isLoading : false});
        };
        this.ws.onmessage = (e) => {
            console.log(e.data);
            let data = JSON.parse(e.data);
            if (data.messageType === 'HOSTGAME') {
                this.setState({gameCode: data.content});
            }
        };
        this.ws.onclose = (e) => {
            console.log('Disconnected from Server. ' + e.reason);
        };
        this.ws.onerror = e => {
            console.log('Error Occurred');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let history = useHistory();
        if(this.state.gameCode !== 'ERROR') {
            history.push('/gaming');
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
        return(<React.Fragment>        
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
                            <ChoiceCard title='Host' form='host' handleClickForHostGame={this.handleClickForHostGame}/>
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
        return (<Host websocket={this.ws}/>)
    };

    guesting = () => {
        return (<Guest websocket={this.ws} guestName = {this.currentGuestName} guestGameCode = {this.currentGuestGameCode}/>)
    };

    gaming = () => {
        return (<p>wew2</p>)
    };

    layoutContent = () => {
        return (
            <React.Fragment>
                <div style={{marginBottom: 10 + 'px'}}>
                    <CustomNavBar brand='DCAP Buzzer'/>
                </div>
                <BrowserRouter>
                    <Route exact path='/' component={this.main}/>
                    <Route exact path='/host' component={this.hosting}/>
                    <Route exact path='/guest' component={this.guesting}/>
                    <Route exact path='/gaming' component={this.gaming}/>
                </BrowserRouter>
            </React.Fragment>
        )
    };

    render() {
        return (
            <React.Fragment>
                {this.state.isLoading? <LoadingWholePage message='Connecting to server'/> : this.layoutContent()}
            </React.Fragment>
        )
    }
}
//todo implement buzzing