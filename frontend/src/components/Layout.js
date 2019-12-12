import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomNavBar from './CustomNavBar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ChoiceCard from './ChoiceCard'
import {BrowserRouter, Route} from 'react-router-dom'
import Host from './Host'
import Guest from './Guest'
import LoadingWholePage from './LoadingWholePage'

export default class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
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
                            <ChoiceCard title='Host' form='host'/>
                        </Col>
                        <Col>
                            <ChoiceCard title='Guest' form='guest' handleClickForJoinGame={this.handleClickForJoinGame}
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

    layoutContent = () => {
        return (
            <React.Fragment>
                <div style={{marginBottom: 10 + 'px'}}>
                    <CustomNavBar brand='DCAP Buzzer'/>
                </div>
                <BrowserRouter>
                    <Route exact={true} path='/' component={this.main}/>
                    <Route exact={true} path='/host' component={this.hosting}/>
                    <Route exact={true} path='/guest' component={this.guesting}/>
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