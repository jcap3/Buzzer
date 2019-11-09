import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

export default class SelectModeMessage extends React.Component {
    state = {

    }

    render() {
        return (
            <Jumbotron >
                <h1>Select mode</h1>
                <p>
                    Enter as the host to create and manage a game. 
                </p>
                <p>
                    Enter as guest and the one to press the buzzer!
                </p>
            </Jumbotron>
        )
    }
}