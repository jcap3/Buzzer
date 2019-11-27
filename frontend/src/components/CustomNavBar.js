import React from 'react'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export default class CustomNavBar extends React.Component {
    render() {
        return (
            <NavBar bg='primary' variant='dark'>
                <NavBar.Brand href='/#'>{this.props.brand}</NavBar.Brand>
                <Nav className='ml-auto'>
                    <Nav.Link href='https://eur.delve.office.com/?u=fc84fb2f-50bf-478f-8987-4ae76d5baebb&v=work' target="_blank">About Developer</Nav.Link>
                    {/*https://github.com/jcap3*/}
                </Nav>
            </NavBar>
        )
    } 
}
