import { createElementWithClass } from "./createElementWithClass.js";

export const keyboardEASY = createElementWithClass(
  "div",
  "keyboard-easy keyboard",
);
export const keyboardMEDIUM = createElementWithClass(
  "div",
  "keyboard-medium keyboard hidden",
);

function createEasyKeyboard() {
  for (let i = 0; i < 10; i++) {
    let keyboardButton = createElementWithClass(
      "div",
      `button button-${i} key-button key-button-easy`,
      `${i}`,
    );
    keyboardEASY.append(keyboardButton);
  }
}

export function createMediumKeyboard() {
  for (let i = 65; i < 91; i++) {
    let keyboardButton = createElementWithClass(
      "div",
      `button button-${String.fromCharCode(i)} key-button key-button-medium`,
      `${String.fromCharCode(i)}`,
    );
    keyboardMEDIUM.append(keyboardButton);
  }
}

document.onload = createEasyKeyboard();

export const keyboardBlock = createElementWithClass("div", "keyboard-block");
keyboardBlock.append(keyboardEASY, keyboardMEDIUM);

export const allKeyboardButtons = document.getElementsByClassName("key-button");
