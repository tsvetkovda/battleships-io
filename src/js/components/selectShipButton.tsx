import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Badge } from 'reactstrap';

import { selectShip } from '../actions/index';

const SelectShipButton = (props: any) => {
  const { shipSize } = props;

  const availableShips = useSelector((state) => state.player.availableShips);
  const selectedShipSize = useSelector((state) => state.selectedShipSize);

  const badgeColor = availableShips[shipSize] > 0 ? 'secondary' : 'danger';
  const innerHtml = `Size: ${shipSize}`;
  const badgeInnerHtml = `x ${availableShips[shipSize]}`;

  const dispatch = useDispatch();

  return (
    <Button
      color='primary'
      outline
      onClick={() => dispatch(selectShip(shipSize))}
      active={selectedShipSize === shipSize && availableShips[shipSize] > 0}
    >
      {innerHtml} <Badge color={badgeColor}>{badgeInnerHtml}</Badge>
    </Button>
  );
};

export default SelectShipButton;
