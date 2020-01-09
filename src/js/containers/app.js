import React, { Component } from "react";
import { connect } from "react-redux";

import Lobby from "./lobby";
import Multiplayer from "./multiplayer";

import { LOBBY } from "../actions";

class App extends Component {
    render() {
        const { mode } = this.props;

        return mode === LOBBY ? <Lobby /> : <Multiplayer />;
    }
}

const mapStateToProps = state => {
    const { mode } = state;
    return { mode };
};

export default connect(mapStateToProps)(App);
