import { createElementWithClass } from "./createElementWithClass.js";
import {
  newGameButtonClickHandler,
  nextButtonClickHandler,
  repeatSequenceButtonClickHandler,
  startGameButtonClickHandler,
} from "./handlers.js";

export const startButton = createElementWithClass(
  "div",
  "start-button button",
  "START",
);

export const newGameButton = createElementWithClass(
  "div",
  "button new-game hidden",
  "New Game",
);

export const repeatSequenceButton = createElementWithClass(
  "div",
  "button repeat-sequence hidden",
  "Repeat the sequence",
);

export const nextButton = createElementWithClass(
  "div",
  "next-button button hidden",
  "Next",
);

export const controlButtons = createElementWithClass("div", "control-buttons");
controlButtons.append(newGameButton, repeatSequenceButton, nextButton);

repeatSequenceButton.addEventListener("click", (event) => {
  repeatSequenceButtonClickHandler(event);
});

nextButton.addEventListener("click", (event) => {
  nextButtonClickHandler(event);
});

newGameButton.addEventListener("click", (event) =>
  newGameButtonClickHandler(event),
);

startButton.addEventListener("click", (event) => {
  startGameButtonClickHandler(event);
});
