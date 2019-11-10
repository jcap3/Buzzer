import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomNavBar from './CustomNavBar'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ChoiceCard from './ChoiceCard'
import {BrowserRouter, Route} from 'react-router-dom'
import Host from './Host'

export default class Layout extends React.Component {
    state = {

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
    }
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
                            <ChoiceCard title='Guest' form='guest'/>
                        </Col>
                    </Row>
                </Container>
        </React.Fragment>)
    }    

    hosting = () => {
        return (<Host test='wew'/>)
    }

    guesting = () => {
        return (<h1>guesting</h1>)
    }

    render() {
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
    }
}