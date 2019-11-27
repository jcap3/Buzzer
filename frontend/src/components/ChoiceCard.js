import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


export default class ChoiceCard extends React.Component {
    
    createForm = () => {
        let form;
        if (this.props.form === 'guest')
            form = 
            <Form>
                <Form.Group>
                    <Form.Label column="">Name</Form.Label>
                    <Form.Control type='text' placeholder='Cardo Dalisay'/>
                    <Form.Text className='text-muted'>
                        Other players will see this name 
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label column="">Game Code</Form.Label>
                    <Form.Control type='text' placeholder='ABC12'/>                
                </Form.Group>
                <Button variant='primary' type='submit' href='guest'>
                    Enter Game
                </Button>
            </Form>;
        else 
            form = 
            <Button variant='primary' type='submit' href='host'>
                Host Game
            </Button>;
        return (
            form
        )
    };

    render () {
        return (
            <Card border= {this.props.form === 'host'? 'primary': 'danger'}>
                <Card.Header ><Card.Title>{this.props.title}</Card.Title></Card.Header>
                <Card.Body>
                    {this.createForm()}        
                </Card.Body>
            </Card>
        )
    }
}