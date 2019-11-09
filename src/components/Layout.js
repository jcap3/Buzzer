import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomNavBar from './CustomNavBar'
import SelectModeMessage from './SelectModeMessage'
import ChoiceCard from './ChoiceCard'
import {BrowserRouter, Route} from 'react-router-dom'


export default class Layout extends React.Component {
    state = {

    }

    main = () => {
        return(<React.Fragment>
            <div style={{marginBottom: 10 + 'px'}}>
                    <CustomNavBar brand='DCAP Buzzer'/>
                </div>
                <Container>
                    <Row >
                        <Col>
                            <SelectModeMessage />
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
        return (<h1>Host Page</h1>)
    }

    guesting = () => {
        return (<h1>guesting</h1>)
    }

    render() {
        return (
            <BrowserRouter>
                <Route exact={true} path='/' component={this.main}/>
                <Route exact={true} path='/host' component={this.hosting}/>
                <Route exact={true} path='/guest' component={this.guesting}/>
            </BrowserRouter> 
        )
    }
}