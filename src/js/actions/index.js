export const LOBBY = "LOBBY";

export const SINGLEPLAYER = "SINGLEPLAYER";

export const MULTIPLAYER = "MULTIPLAYER";

export const SELECT_GAMEMODE = "SELECT_GAMEMODE";

export const selectGameMode = mode => {
    return {
        type: SELECT_GAMEMODE,
        payload: mode,
    };
};

export const TOOGLE_REGISTRATION = "TOOGLE_REGISTRATION";

export const toogleRegistration = () => {
    return {
        type: TOOGLE_REGISTRATION,
    };
};

export const SIGN_IN = "SIGN_IN";

export const signIn = () => {
    return {
        type: SIGN_IN,
    };
};
