export const LOBBY = "LOBBY";
export const SINGLEPLAYER = "SINGLEPLAYER";
export const MULTIPLAYER = "MULTIPLAYER";
export const SELECT_GAMEMODE = "SELECT_GAMEMODE";

export const selectGameMode = mode => ({ type: SELECT_GAMEMODE, payload: mode });
