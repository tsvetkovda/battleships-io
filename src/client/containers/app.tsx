import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { LOBBY } from '../actions';
import { RootState } from '../reducers';

import Lobby from './lobby';
import Multiplayer from './multiplayer';

const socket = io('/');

interface StateProps {
  mode: string;
}

type Props = StateProps;

class App extends Component<Props> {
  render(): JSX.Element {
    const { mode } = this.props;

    if (mode === LOBBY) {
      return <Lobby socket={socket} />;
    }

    return <Multiplayer socket={socket} />;
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { mode } = state;
  return { mode };
};

export default connect(mapStateToProps)(App);
