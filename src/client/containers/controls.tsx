import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Badge } from 'reactstrap';

import SelectShipButton from '../components/selectShipButton';

import { selectShip, changeOrientation, resetField } from '../actions';

interface IProps {
  orientation: string;
  changeOrientation: () => void;
  resetField: () => void;
}

class Controls extends Component<IProps> {
  render() {
    const { resetField, orientation, changeOrientation } = this.props;

    return (
      <ButtonGroup size='sm' className='controls mt-3'>
        <SelectShipButton shipSize={1} />
        <SelectShipButton shipSize={2} />
        <SelectShipButton shipSize={3} />
        <SelectShipButton shipSize={4} />
        <Button color='secondary' outline onClick={changeOrientation}>
          Rotate
          <Badge color='secondary'>{orientation}</Badge>
        </Button>
        <Button color='secondary' outline onClick={resetField}>
          Reset
        </Button>
        <Button color='secondary' outline>
          Random
        </Button>
      </ButtonGroup>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { orientation } = state;

  return { orientation };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    selectShip: (size: number) => dispatch(selectShip(size)),
    changeOrientation: () => dispatch(changeOrientation()),
    resetField: () => dispatch(resetField()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
