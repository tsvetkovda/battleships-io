import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import nanoid from 'nanoid';

import { ICell, IPlayer, Field, ITargetCell, IAvailableShips } from '../utils/interfaces';

import { RootState } from '../reducers';

import {
  selectGamemode,
  setBattlePhase,
  LOBBY,
  WAIT,
  WARM_UP,
  BATTLE,
  placeShip,
  setEnemyField,
  canPlayerShoot,
  receiveShot,
  resetField,
  resetEnemyField,
} from '../actions';

import Chat from './chat';
import Controls from './controls';
import Timer from './timer';

interface OwnProps {
  socket: SocketIOClient.Socket;
}

interface StateProps {
  mode: string;
  player: IPlayer;
  enemy: {
    field: ICell[];
  };
  orientation: string;
  selectedShipSize: number;
  phase: string;
}

interface DispatchProps {
  resetField: () => void;
  resetEnemyField: () => void;
  selectLobby: () => void;
  canPlayerShoot: (bool: boolean) => void;
  placeShip: (
    position: ITargetCell,
    shipSize: number,
    orientation: string,
    availableShips: IAvailableShips
  ) => void;
  setBattlePhase: (phase: string) => void;
  setEnemyField: (field: Field) => void;
  receiveShot: (position: ITargetCell) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class Multiplayer extends Component<Props> {
  componentDidMount(): void {
    const { socket } = this.props;

    socket.on('allPlayersConnected', (): void => this.handleAllPlayersConnected());
    socket.on('playerLeft', (): void => this.handleOpponentLeft());
    socket.on('sendDataToOpponent', (data): void => this.handleReceiveOpponentData(data));
    socket.on('sendShot', (data): void => this.handleReceiveShot(data));
    socket.on('defineFirstTurn', (name): void => this.handleDefineFirstTurn(name));
  }

  componentWillUnmount(): void {
    const { socket } = this.props;

    socket.removeEventListener('allPlayersConnected', (): void => this.handleAllPlayersConnected());
    socket.removeEventListener('playerLeft', (): void => this.handleOpponentLeft());
    socket.removeEventListener('sendDataToOpponent', (data): void =>
      this.handleReceiveOpponentData(data)
    );
    socket.removeEventListener('sendShot', (data): void => this.handleReceiveShot(data));
    socket.removeEventListener('defineFirstTurn', (name): void => this.handleDefineFirstTurn(name));
  }

  handleLeaveRoom(): void {
    const { socket, selectLobby, player, resetField, resetEnemyField, setBattlePhase } = this.props;

    socket.emit('leaveRoom', { username: player.name, roomId: player.roomId });

    resetField();
    resetEnemyField();
    setBattlePhase(WAIT);
    selectLobby();
  }

  handleOpponentLeft(): void {
    const { resetField, resetEnemyField, setBattlePhase } = this.props;

    setBattlePhase(WAIT);
    resetField();
    resetEnemyField();
  }

  handleDefineFirstTurn(name): void {
    const { player, canPlayerShoot } = this.props;

    if (player.name === name) {
      canPlayerShoot(true);
    }
  }

  handleSendShot(cell): void {
    const { socket, phase, player, enemy, canPlayerShoot } = this.props;

    const targetCell = enemy.field.find((el): boolean => el.x === cell.x && el.y === cell.y);

    if (player.canShoot && phase === BATTLE) {
      if (!targetCell.destroyed && !targetCell.missed) {
        socket.emit('sendShot', cell);
        canPlayerShoot(false);
      }

      if (targetCell.hasShip) {
        socket.emit('sendShot', cell);
        canPlayerShoot(true);
      }
    }
  }

  handleReceiveShot(data): void {
    const { receiveShot, canPlayerShoot, player } = this.props;

    receiveShot(data);

    const targetCell = player.field.find(
      (cell): boolean => cell.x === data.x && cell.y === data.y && cell.hasShip
    );

    if (targetCell) {
      canPlayerShoot(false);
    } else {
      canPlayerShoot(true);
    }

    this.handleSendDataToOpponent();
  }

  handleReceiveOpponentData(data): void {
    const { setEnemyField } = this.props;

    setEnemyField(data);
  }

  handleSendDataToOpponent(): void {
    const { socket, player } = this.props;

    socket.emit('sendDataToOpponent', player.field);
  }

  handleDefineWinner(): string {
    const { player, enemy } = this.props;

    const playerHp = player.field.filter((x): boolean => x.hasShip && !x.destroyed).length;
    const enemyHp = enemy.field.filter((x): boolean => x.hasShip && !x.destroyed).length;

    if (playerHp === 0) {
      return 'You lose';
    }

    if (enemyHp === 0) {
      return 'You win';
    }

    return player.canShoot ? 'You turn' : 'Enemy Turn';
  }

  handleAllPlayersConnected(): void {
    const { setBattlePhase } = this.props;

    setBattlePhase(WARM_UP);
  }

  handleEnemyCells(cell): string {
    if (cell.destroyed) return 'enemy-cell_destroyed';

    if (cell.missed) return 'cell-missed';

    return 'cell';
  }

  render(): JSX.Element {
    const { selectedShipSize, orientation, placeShip, player, enemy, phase, socket } = this.props;

    let Header;

    if (phase === WAIT) {
      Header = <h4>Waiting for other player to connect...</h4>;
    }

    if (phase === WARM_UP) {
      Header = (
        <>
          <h4>Place your ships</h4>
          <Timer socket={socket} />
        </>
      );
    }

    if (phase === BATTLE) {
      Header = <h4>{this.handleDefineWinner()}</h4>;
    }

    return (
      <Container>
        <Row className='mb-3 mt-3'>
          <Col>
            <Button onClick={(): void => this.handleLeaveRoom()} color='primary'>
              Back to lobby
            </Button>
          </Col>
        </Row>
        <Row className='text-center mb-3'>
          <Col>{Header}</Col>
        </Row>
        <Row className='board mb-3'>
          <Col className='board__player-field col-md-6'>
            <h4 className='text-center'>You</h4>
            <div className='grid d-flex flex-row mb-3'>
              {player.field.map(
                (el: ICell): JSX.Element => (
                  <div
                    className={el.className}
                    key={`k${nanoid()}`}
                    data-x={el.x}
                    data-y={el.y}
                    role='cell'
                    onClick={(): void =>
                      placeShip(
                        { x: el.x, y: el.y },
                        selectedShipSize,
                        orientation,
                        player.availableShips
                      )
                    }
                  >
                    <img src='../../src/assets/img/aspect-ratio.png' alt='' />
                  </div>
                )
              )}
            </div>
            {phase === WARM_UP ? <Controls /> : null}
          </Col>
          <Col className='board__enemy-field col-md-6'>
            <h4 className='text-center'>Enemy</h4>
            <div className='grid d-flex flex-row'>
              {enemy.field.map(
                (cell): JSX.Element => (
                  <div
                    className={this.handleEnemyCells(cell)}
                    key={`k${nanoid()}`}
                    data-x={cell.x}
                    data-y={cell.y}
                    role='cell'
                    onClick={(): void => this.handleSendShot(cell)}
                  >
                    <img src='../../src/assets/img/aspect-ratio.png' alt='' />
                  </div>
                )
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Chat socket={socket} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { mode, selectedShipSize, player, orientation, enemy, phase } = state;

  return {
    mode,
    selectedShipSize,
    player,
    enemy,
    orientation,
    phase,
  };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
  return {
    selectLobby: (): void => dispatch(selectGamemode(LOBBY)),
    placeShip: (position, shipSize, orientation, availableShips: IAvailableShips): void =>
      dispatch(placeShip(position, shipSize, orientation, availableShips)),
    setBattlePhase: (phase: string): void => dispatch(setBattlePhase(phase)),
    setEnemyField: (field): void => dispatch(setEnemyField(field)),
    receiveShot: (position): void => dispatch(receiveShot(position)),
    canPlayerShoot: (bool: boolean): void => dispatch(canPlayerShoot(bool)),
    resetField: (): void => dispatch(resetField()),
    resetEnemyField: (): void => dispatch(resetEnemyField()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
