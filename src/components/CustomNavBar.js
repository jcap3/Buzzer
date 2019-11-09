import React from 'react'
import NavBar from 'react-bootstrap/Navbar'

export default class CustomNavBar extends React.Component {
    render() {
        return (
            <NavBar bg='primary' variant='dark'>
                <NavBar.Brand>{this.props.brand}</NavBar.Brand>
            </NavBar>
        )
    } 
}
