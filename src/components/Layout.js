import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import CustomNavBar from './CustomNavBar'
import SelectModeMessage from './SelectModeMessage'
import ChoiceCard from './ChoiceCard'

export default class Layout extends React.Component {
    state = {

    }

    render() {
        return (
            <React.Fragment>
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
                            <ChoiceCard title='Guest' form='gueust'/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}