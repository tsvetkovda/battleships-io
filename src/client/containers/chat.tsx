import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { IPlayer } from '../utils/interfaces';
import { setMessage } from '../actions';
import { RootState } from '../reducers';

interface OwnProps {
  socket: SocketIOClient.Socket;
}

interface StateProps {
  player: IPlayer;
  message: string;
}

interface DispatchProps {
  setMessage: (message: string) => void;
  setMessageClear: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class Chat extends Component<Props> {
  componentDidMount(): void {
    const { socket } = this.props;

    socket.on('chatMsg', (data: { username: string; msg: string }): void =>
      this.handleReceiveMessage(data)
    );
  }

  componentWillUnmount(): void {
    const { socket } = this.props;

    socket.removeEventListener(
      'chatMsg',
      (data: { username: string; msg: string }): void =>
        this.handleReceiveMessage(data)
    );
  }

  handleReceiveMessage(data: { username: string; msg: string }): void {
    if (data) {
      const div = document.createElement('div');

      document
        .querySelector('.chat')
        .append(`${data.username}: ${data.msg}`, div);
    }
  }

  handleSendMessage(): void {
    const { message, setMessageClear, player, socket } = this.props;

    socket.emit('chatMsg', { username: player.name, msg: message });

    setMessageClear();
  }

  render(): JSX.Element {
    const { message, setMessage } = this.props;

    return (
      <>
        <div className='chat' />
        <InputGroup>
          <Input
            onChange={(event): void => setMessage(event.target.value)}
            value={message}
          />
          <InputGroupAddon addonType='append'>
            <Button onClick={(): void => this.handleSendMessage()}>Send</Button>
          </InputGroupAddon>
        </InputGroup>
      </>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { player, message } = state;

  return { player, message };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
  return {
    setMessage: (msg: string): void => dispatch(setMessage(msg)),
    setMessageClear: (): void => dispatch(setMessage('')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
