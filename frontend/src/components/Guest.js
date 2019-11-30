import React from 'react'


export default class Guest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }
    
    componentDidMount(){
        console.log(this.props.guestName);
        console.log(this.props.guestGameCode);        
    }

    render () {
        return (
            <React.Fragment>
                <p>guesting</p>
            </React.Fragment>
        )
    }
}