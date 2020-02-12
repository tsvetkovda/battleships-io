import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { LOBBY } from '../actions';

import Lobby from './lobby';
import Multiplayer from './multiplayer';

const socket = io('/');

interface IProps {
  mode: string;
}

class App extends Component<IProps> {
  constructor(props: IProps) {
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

const mapStateToProps = (state: any) => {
  const { mode } = state;
  return { mode };
};

export default connect(mapStateToProps)(App);
