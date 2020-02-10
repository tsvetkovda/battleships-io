import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Col, Input, InputGroup } from 'reactstrap';

import { selectGameMode, MULTIPLAYER, setName, setRoomId } from '../actions';

type Props = {
  player: {
    field: [];
    availableShips: {};
    name: string;
    roomId: string;
    canShoot: boolean;
  };
  socket: any;
  selectMultiplayer: () => any;
  setName: (x: string) => any;
  setRoomId: (x: string) => any;
};

class Lobby extends Component<Props> {
  handleGameCreation() {
    const { socket, player, selectMultiplayer } = this.props;

    socket.emit('createRoom', { username: player.name, roomId: player.roomId });

    socket.on('roomCreation', (data: { canCreate: boolean; msg: string }) => {
      return data.canCreate ? selectMultiplayer() : console.log(data.msg);
    });
  }

  handleJoinGame() {
    const { socket, player, selectMultiplayer } = this.props;

    socket.emit('joinRoom', { username: player.name, roomId: player.roomId });

    socket.on(
      'playerConnection',
      (data: { canConnect: boolean; msg: string }) => {
        return data.canConnect ? selectMultiplayer() : console.log(data.msg);
      }
    );
  }

  render() {
    const { setName, setRoomId, player } = this.props;

    return (
      <Container>
        <Row className='logo text-center'>
          <Col>
            <h1 className='logo-text'>BATTLESHIPS-IO</h1>
            <p className='logo-description'>
              Classic strategy game for two players
            </p>
          </Col>
        </Row>
        <hr />
        <Row className='mb-3'>
          <Col className='text-center col-sm-6 offset-sm-3'>
            <h4>Your name:</h4>
            <InputGroup size='lg' className='mb-3'>
              <Input
                onChange={(event) => setName(event.target.value)}
                value={player.name}
                className='text-center'
              />
            </InputGroup>
            <h4>Room id:</h4>
            <InputGroup size='lg' className='mb-3'>
              <Input
                defaultValue={player.roomId}
                onChange={(event) => setRoomId(event.target.value)}
                className='text-center'
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className='text-center'>
          <Col>
            <Button
              size='lg'
              color='primary'
              onClick={() => this.handleGameCreation()}
            >
              Create game
            </Button>{' '}
            <Button size='lg' onClick={() => this.handleJoinGame()}>
              Join
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { mode, player } = state;

  return { mode, player };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectMultiplayer: () => dispatch(selectGameMode(MULTIPLAYER)),
    setName: (name: string) => dispatch(setName(name)),
    setRoomId: (roomId: string) => dispatch(setRoomId(roomId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
