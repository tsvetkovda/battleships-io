import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Badge } from 'reactstrap';

import { selectShip, changeOrientation, reset, setRandom } from '../actions';

class Controls extends Component {
  render() {
    const {
      player,
      reset,
      setRandom,
      orientation,
      changeOrientation,
      selectShip,
      selectedShipSize,
    } = this.props;

    return (
      <ButtonGroup size='sm' className='controls mt-3'>
        <Button
          color='primary'
          outline
          onClick={() => selectShip(1)}
          active={selectedShipSize === 1 && player.availableShips[1] > 0}
        >
          Size: 1{' '}
          <Badge color={player.availableShips[1] > 0 ? 'secondary' : 'danger'}>
            {`x ${player.availableShips[1]}`}
          </Badge>
        </Button>
        <Button
          color='primary'
          outline
          onClick={() => selectShip(2)}
          active={selectedShipSize === 2 && player.availableShips[2] > 0}
        >
          Size: 2{' '}
          <Badge color={player.availableShips[2] > 0 ? 'secondary' : 'danger'}>
            {`x ${player.availableShips[2]}`}
          </Badge>
        </Button>
        <Button
          color='primary'
          outline
          onClick={() => selectShip(3)}
          active={selectedShipSize === 3 && player.availableShips[3] > 0}
        >
          Size: 3{' '}
          <Badge color={player.availableShips[3] > 0 ? 'secondary' : 'danger'}>
            {`x ${player.availableShips[3]}`}
          </Badge>
        </Button>
        <Button
          color='primary'
          outline
          onClick={() => selectShip(4)}
          active={selectedShipSize === 4 && player.availableShips[4] > 0}
        >
          Size: 4{' '}
          <Badge color={player.availableShips[4] > 0 ? 'secondary' : 'danger'}>
            {`x ${player.availableShips[4]}`}
          </Badge>
        </Button>
        <Button color='secondary' outline onClick={changeOrientation}>
          Rotate
          <Badge color='secondary'>{orientation}</Badge>
        </Button>
        <Button color='secondary' outline onClick={reset}>
          Reset
        </Button>
        <Button color='secondary' outline onClick={setRandom}>
          Random
        </Button>
      </ButtonGroup>
    );
  }
}

const mapStateToProps = (state) => {
  const { player, orientation, selectedShipSize } = state;

  return {
    player,
    orientation,
    selectedShipSize,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectShip: (size) => dispatch(selectShip(size)),
    changeOrientation: () => dispatch(changeOrientation()),
    reset: () => dispatch(reset()),
    setRandom: () => dispatch(setRandom()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
