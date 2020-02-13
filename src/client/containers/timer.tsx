import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IPlayer } from '../utils/interfaces';
import { RootState } from '../reducers';

import {
  decrementTimer,
  resetTimer,
  setBattlePhase,
  selectShip,
  resetField,
  BATTLE,
} from '../actions';

interface OwnProps {
  socket: SocketIOClient.Socket;
}

interface StateProps {
  timer: number;
  player: IPlayer;
}

interface DispatchProps {
  resetTimer: () => void;
  resetField: () => void;
  decrementTimer: () => void;
  setBattlePhase: (phase: string) => void;
  selectShip: (shipSize: number) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class Timer extends Component<Props> {
  constructor(props: Props) {
    super(props);

    this.timerId = null;
  }

  componentDidMount(): void {
    const { resetTimer, resetField } = this.props;

    resetTimer();
    resetField();

    const timerWrap = (): void => {
      const { decrementTimer, timer, setBattlePhase, selectShip } = this.props;

      // eslint-disable-next-line eqeqeq
      if (timer == 0) {
        clearInterval(this.timerId);

        selectShip(null);
        this.handleSendDataToOpponent();
        setTimeout((): void => setBattlePhase(BATTLE), 1000);
      } else {
        decrementTimer();
      }
    };

    this.timerId = setInterval(timerWrap, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.timerId);
  }

  handleSendDataToOpponent(): void {
    const { socket, player } = this.props;

    socket.emit('sendDataToOpponent', player.field);
  }

  render(): JSX.Element {
    const { timer } = this.props;

    return <div className='timer'>{timer}</div>;
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const { timer, player } = state;

  return {
    timer,
    player,
  };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
  return {
    decrementTimer: (): void => dispatch(decrementTimer()),
    resetTimer: (): void => dispatch(resetTimer()),
    setBattlePhase: (phase: string): void => dispatch(setBattlePhase(phase)),
    selectShip: (size: number): void => dispatch(selectShip(size)),
    resetField: (): void => dispatch(resetField()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
