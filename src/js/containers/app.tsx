import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import Lobby from './lobby';
import Multiplayer from './multiplayer';

import { LOBBY } from '../actions/index.js';

const socket = io('/');

type Props = {
  mode: string;
};

interface MapStateToProps {
  mode: string;
}

class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { mode } = this.props;

    return mode === LOBBY ? (
      <Lobby socket={socket} />
    ) : (
      <Multiplayer socket={socket} />
    );
  }
}

const mapStateToProps = (state: MapStateToProps) => {
  const { mode } = state;
  return { mode };
};

export default connect(mapStateToProps)(App);
