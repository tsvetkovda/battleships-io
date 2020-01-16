export const DECREMENT = "DECREMENT";
export const RESET_TIMER = "RESET_TIMER";

export const decrementTimer = () => ({ type: DECREMENT });
export const resetTimer = () => ({ type: RESET_TIMER });
