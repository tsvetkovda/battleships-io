import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Badge } from 'reactstrap';

import SelectShipButton from '../components/selectShipButton';
import { selectShip, changeOrientation, resetField } from '../actions';
import { RootState } from '../reducers';

interface StateProps {
  orientation: string;
}

interface DispatchProps {
  selectShip: (size: number) => void;
  changeOrientation: () => void;
  resetField: () => void;
}

type Props = StateProps & DispatchProps;

class Controls extends Component<Props> {
  render(): JSX.Element {
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

const mapStateToProps = (state: RootState): StateProps => {
  const { orientation } = state;

  return { orientation };
};

const mapDispatchToProps = (dispatch): DispatchProps => {
  return {
    selectShip: (size: number): void => dispatch(selectShip(size)),
    changeOrientation: (): void => dispatch(changeOrientation()),
    resetField: (): void => dispatch(resetField()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
