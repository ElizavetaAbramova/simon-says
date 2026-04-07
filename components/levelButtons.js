import { levels } from "./constants.js";
import { createElementWithClass } from "./createElementWithClass.js";
import { levelButtonClickHandler } from "./handlers.js";

export const easyButton = createElementWithClass(
  "div",
  "button level-button easy active",
  "Easy",
);

export const mediumButton = createElementWithClass(
  "div",
  "button level-button medium",
  "Medium",
);

export const hardButton = createElementWithClass(
  "div",
  "button level-button hard",
  "Hard",
);

easyButton.addEventListener("click", (event) => {
  levelButtonClickHandler(event, levels.easy);
});

mediumButton.addEventListener("click", (event) => {
  levelButtonClickHandler(event, levels.medium);
});

hardButton.addEventListener("click", (event) => {
  levelButtonClickHandler(event, levels.hard);
});

export const levelBlock = createElementWithClass("div", "levelBlock");
levelBlock.append(easyButton, mediumButton, hardButton);
