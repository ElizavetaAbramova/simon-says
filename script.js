import { levels } from "./components/constants.js";
import { mainSection } from "./components/pageElements.js";

export const state = {
  isGameStarted: false,
  sequenceLength: 2,
  difficulty: levels.easy,
  sequence: "",
  position: 0,
  isSequenceRepeated: false,
  errorCounter: 0,
  successCounter: 0,
};

export const setState = (key, value) => {
  state[key] = value;
};

const body = document.querySelector(".body");
body.append(mainSection);
