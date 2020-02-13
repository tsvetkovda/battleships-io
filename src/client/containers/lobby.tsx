import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Input, InputGroup } from 'reactstrap';

import { IPlayer } from '../utils/interfaces';
import { selectGamemode, MULTIPLAYER, setName, setRoomId } from '../actions';
import { RootState } from '../reducers';

interface OwnProps {
  socket: SocketIOClient.Socket;
}

interface StateProps {
  player: IPlayer;
  mode: string;
}

interface DispatchProps {
  selectMultiplayer: () => void;
  setName: (name: string) => void;
  setRoomId: (roomId: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class Lobby extends Component<Props> {
  handleGameCreation(): void {
    const { socket, player, selectMultiplayer } = this.props;

    socket.emit('createRoom', { username: player.name, roomId: player.roomId });

    socket.on('roomCreation', (data: { canCreate: boolean; msg: string }): void => {
      return data.canCreate ? selectMultiplayer() : console.log(data.msg);
    });
  }

  handleJoinGame(): void {
    const { socket, player, selectMultiplayer } = this.props;

    socket.emit('joinRoom', { username: player.name, roomId: player.roomId });

    socket.on('playerConnection', (data: { canConnect: boolean; msg: string }): void => {
      return data.canConnect ? selectMultiplayer() : console.log(data.msg);
    });
  }

  render(): JSX.Element {
    const { setName, setRoomId, player } = this.props;

    return (
      <Container>
        <Row className='logo text-center'>
          <Col>
            <h1 className='logo-text'>BATTLESHIPS-IO</h1>
            <p className='logo-description'>Classic strategy game for two players</p>
          </Col>
        </Row>
        <hr />
        <Row className='mb-3'>
          <Col className='text-center col-sm-6 offset-sm-3'>
            <h4>Your name:</h4>
            <InputGroup size='lg' className='mb-3'>
              <Input
                onChange={(event): void => setName(event.target.value)}
                value={player.name}
                className='text-center'
              />
            </InputGroup>
            <h4>Room id:</h4>
            <InputGroup size='lg' className='mb-3'>
              <Input
                defaultValue={player.roomId}
                onChange={(event): void => setRoomId(event.target.value)}
                className='text-center'
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <Button size='lg' color='primary' onClick={(): void => this.handleGameCreation()}>
              Create game
            </Button>{' '}
            <Button size='lg' onClick={(): void => this.handleJoinGame()}>
              Join
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { mode, player } = state;

  return { mode, player };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
  return {
    selectMultiplayer: (): void => dispatch(selectGamemode(MULTIPLAYER)),
    setName: (name: string): void => dispatch(setName(name)),
    setRoomId: (roomId: string): void => dispatch(setRoomId(roomId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
