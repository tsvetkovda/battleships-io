export const SELECT_GAME_MODE = 'SELECT_GAME_MODE';

export const LOBBY = 'LOBBY';
export const SINGLEPLAYER = 'SINGLEPLAYER';
export const MULTIPLAYER = 'MULTIPLAYER';

export const selectGameMode = (mode) => ({
  type: SELECT_GAME_MODE,
  payload: mode,
});
