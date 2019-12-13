import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

export default class LoadingWholePage extends React.Component {
    render() {
        return (
            <div style={{position: "fixed", top: 50+'%', left: 45 +'%'}}>
                <div>
                    <Spinner animation='grow' /> 
                    <span>{this.props.message}</span>
                </div>
            </div>
        )
    }
}