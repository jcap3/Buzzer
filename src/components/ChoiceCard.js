import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button'

export default class ChoiceCard extends React.Component {
    
    render () {
        return (
            <Accordion>
                <Card>                            
                    <Card.Header>
                        <Accordion.Toggle as={Button} eventKey='0'>
                            {this.props.title}                
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey='0'>
                        <Card.Body>
                            
                        </Card.Body>        
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}