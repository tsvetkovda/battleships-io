export const CAN_PLAYER_SHOOT = 'CAN_PLAYER_SHOOT';

export const canPlayerShoot = (bool: boolean) => ({
  type: CAN_PLAYER_SHOOT,
  bool,
});
