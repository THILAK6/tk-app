import { Roll } from "../domain/roll";

type Store = {
    currentRoll: null | Roll;
}

const store: Store = {
    currentRoll: null,
}

export const setCurrentRoll = (roll: Roll) => {
    store.currentRoll = roll;
}

export const getCurrentRoll = () => store.currentRoll;
