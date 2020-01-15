export const DECREMENT = "DECREMENT";
export const RESET_TIMER = "RESET";

export const decrementTimer = () => ({ type: DECREMENT });
export const resetTimer = () => ({ type: RESET_TIMER });
