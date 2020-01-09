import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import { LOBBY } from "../actions";

import Lobby from "./lobby";
import Multiplayer from "./multiplayer";

const socket = io("/");

class App extends Component {
    render() {
        const { mode } = this.props;

        return mode === LOBBY ? <Lobby socket={socket} /> : <Multiplayer socket={socket} />;
    }
}

const mapStateToProps = state => {
    const { mode } = state;
    return { mode };
};

export default connect(mapStateToProps)(App);
