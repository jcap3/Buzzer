import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import bulb_on from '../pic_bulbon.gif'
import bulb_off from '../pic_bulbon.gif'
import Image from 'react-bootstrap/Image'

export default class Gaming extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <Card className='text-center' style={{ width: '10rem', position: "fixed", left: 43 +'%' }}>
                            {/* <Card.Img variant='top' src={bulb_on} /> */}
                            <Card.Body>                        
                                <Image src={bulb_on} rounded/>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                
                                </Card.Text>                    
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>    
        )
    }

}