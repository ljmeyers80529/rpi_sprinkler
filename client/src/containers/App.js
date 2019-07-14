import React, { Component } from 'react';
import socketClient from 'socket.io-client';

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://localhost:4011"
        };
    }

    componentDidMount() {
        const { endpoint } = this.state.endpoint;
        const socket = socketClient(endpoint);
        socket.on("FromAPI", data => {
            this.setState({ response: data })
        });
    }

    render() {
        const response = this.state.response.val2;

        return ( 
            <div> { response ? <p> Data received : { response } </p> : <p>Waiting... </p> } 
            </div>
        );
    }
}

export default App;