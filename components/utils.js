import { setState, state } from "../script.js";
import { nextButton, repeatSequenceButton } from "./levelButtons.js";
import { inputFromKeyboard, virtualKeyboardHandler } from "./handlers.js";
import { allKeyboardButtons } from "./keyboards.js";
import { errorMessage, successMessage } from "./pageElements.js";

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function checkInput(key, index) {
  if (state.sequence[index] !== key) {
    setState("errorCounter", state.errorCounter + 1);
    errorMessage.classList.remove("hidden");
    errorMessage.innerText = "Ooops! You did a mistake";
    window.removeEventListener("keypress", inputFromKeyboard);
    removeEventListenerForKeyboard();
    if (state.errorCounter === 2) {
      errorMessage.innerText = "Game Over";
    }
  }
  if (index === state.sequence.length - 1 && state.sequence[index] === key) {
    setState("successCounter", state.successCounter + 1);
    successMessage.classList.remove("hidden");
    successMessage.innerText = "All right!";
    setState("position", 0);
    nextButton.classList.remove("hidden");
    repeatSequenceButton.classList.add("hidden");
    window.removeEventListener("keypress", inputFromKeyboard);
    removeEventListenerForKeyboard();
    if (state.successCounter === 5) {
      successMessage.innerText = "Congratulations, you win!";
      nextButton.classList.add("hidden");
      repeatSequenceButton.classList.add("disabled");
      repeatSequenceButton.classList.remove("hidden");
      removeEventListenerForKeyboard();
      window.removeEventListener("keypress", inputFromKeyboard);
    }
  }
}

export function addEventListenerForKeyboard() {
  for (let i = 0; i < allKeyboardButtons.length; i++) {
    allKeyboardButtons[i].addEventListener("click", virtualKeyboardHandler);
  }
}

export function removeEventListenerForKeyboard() {
  for (let i = 0; i < allKeyboardButtons.length; i++) {
    allKeyboardButtons[i].removeEventListener("click", virtualKeyboardHandler);
  }
}

export function disabledLevelChoice() {
  const levelButtons = document.querySelectorAll(".level-button");
  for (let i = 0; i < levelButtons.length; i++) {
    if (!levelButtons[i].classList.contains("active")) {
      levelButtons[i].classList.add("disabled");
      levelButtons[i].title = "start new game to change difficulty";
    }
  }
}

export function ableLevelChoice() {
  let levelButtons = document.querySelectorAll(".level-button");
  for (let i = 0; i < levelButtons.length; i++) {
    if (!levelButtons[i].classList.contains("active")) {
      levelButtons[i].classList.remove("disabled");
      levelButtons[i].title = "choose difficulty";
    }
  }
}
