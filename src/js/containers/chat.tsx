import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { setMessage } from '../actions';

type Props = {
  player: {
    field: [];
    availableShips: {};
    name: string;
    roomId: string;
    canShoot: boolean;
  };
  message: string;
  socket: any;
  setMessage: (x: string) => any;
  setMessageClear: () => any;
};

interface MapStateToProps {
  player: {};
  message: string;
}

class Chat extends Component<Props> {
  componentDidMount() {
    const { socket } = this.props;

    socket.on('chatMsg', (data: { username: string; msg: string }) =>
      this.handleReceiveMessage(data)
    );
  }

  componentWillUnmount() {
    const { socket } = this.props;

    socket.removeEventListener(
      'chatMsg',
      (data: { username: string; msg: string }) =>
        this.handleReceiveMessage(data)
    );
  }

  handleReceiveMessage(data: { username: string; msg: string }) {
    if (data) {
      const div = document.createElement('div');

      document
        .querySelector('.chat')
        .append(`${data.username}: ${data.msg}`, div);
    }
  }

  handleSendMessage() {
    const { message, setMessageClear, player, socket } = this.props;

    socket.emit('chatMsg', { username: player.name, msg: message });

    setMessageClear();
  }

  render() {
    const { message, setMessage } = this.props;

    return (
      <>
        <div className='chat' />
        <InputGroup>
          <Input
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          />
          <InputGroupAddon addonType='append'>
            <Button onClick={() => this.handleSendMessage()}>Send</Button>
          </InputGroupAddon>
        </InputGroup>
      </>
    );
  }
}

const mapStateToProps = (state: MapStateToProps) => {
  const { player, message } = state;

  return { player, message };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setMessage: (msg: string) => dispatch(setMessage(msg)),
    setMessageClear: () => dispatch(setMessage('')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
