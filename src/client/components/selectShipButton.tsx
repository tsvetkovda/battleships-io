import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Badge } from 'reactstrap';

import { selectShip, ControlsTypes } from '../actions/index';
import { RootState } from '../reducers';
import { IAvailableShips } from '../utils/interfaces';

interface Props {
  shipSize: number;
}

const SelectShipButton = (props: Props): JSX.Element => {
  const { shipSize } = props;

  const availableShips = useSelector(
    (state: RootState): IAvailableShips => state.player.availableShips
  );
  const selectedShipSize = useSelector((state: RootState): number => state.selectedShipSize);

  const badgeColor = availableShips[shipSize] > 0 ? 'secondary' : 'danger';
  const innerHtml = `Size: ${shipSize}`;
  const badgeInnerHtml = `x ${availableShips[shipSize]}`;

  const dispatch = useDispatch();

  return (
    <Button
      color='primary'
      outline
      onClick={(): ControlsTypes => dispatch(selectShip(shipSize))}
      active={selectedShipSize === shipSize && availableShips[shipSize] > 0}
    >
      {innerHtml} <Badge color={badgeColor}>{badgeInnerHtml}</Badge>
    </Button>
  );
};

export default SelectShipButton;
