import { controlButtons, startButton } from "./controlButtons.js";
import { createElementWithClass } from "./createElementWithClass.js";
import { keyboardBlock } from "./keyboards.js";
import { levelBlock } from "./levelButtons.js";

export const roundCounter = createElementWithClass(
  "div",
  "round hidden",
  "Round 1/5",
);

export const textLine = document.createElement("input");
textLine.classList.add("text-line");
textLine.value = "";
textLine.readOnly = true;
textLine.type = "text";
textLine.id = "text-line";

export const errorMessage = createElementWithClass(
  "div",
  "error-message hidden",
);
export const successMessage = createElementWithClass(
  "div",
  "success-message hidden",
);

const messageBlock = createElementWithClass("div", "message-block");
messageBlock.append(errorMessage, successMessage);

export const mainSection = createElementWithClass("section", "main");
mainSection.append(
  levelBlock,
  roundCounter,
  textLine,
  messageBlock,
  controlButtons,
  startButton,
  keyboardBlock,
);
