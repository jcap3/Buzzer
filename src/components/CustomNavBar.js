import React from 'react'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class CustomNavBar extends React.Component {
    render() {
        return (
            <NavBar bg='primary' variant='dark'>
                <NavBar.Brand href='/#'>{this.props.brand}</NavBar.Brand>
                <Nav className='ml-auto'>
                    <Nav.Link href='https://github.com/jcap3' target="_blank">About Developer</Nav.Link>
                </Nav>
            </NavBar>
        )
    } 
}
