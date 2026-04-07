import { setState, state } from "../script.js";
import { easyButton, hardButton, mediumButton } from "./levelButtons.js";
import {
  nextButton,
  repeatSequenceButton,
  newGameButton,
  startButton,
} from "./controlButtons.js";
import { createSequence } from "./createSequence.js";
import {
  keyboardEASY,
  keyboardMEDIUM,
  allKeyboardButtons,
  createMediumKeyboard,
} from "./keyboards.js";
import {
  errorMessage,
  roundCounter,
  successMessage,
  textLine,
} from "./pageElements.js";
import {
  ableLevelChoice,
  addEventListenerForKeyboard,
  checkInput,
  delay,
  disabledLevelChoice,
  removeEventListenerForKeyboard,
} from "./utils.js";

export const levelButtonClickHandler = (event, level) => {
  if (
    !event.target.classList.contains("active") &&
    !event.target.classList.contains("disabled")
  ) {
    event.target.classList.add("active");
    setState("difficulty", level);

    switch (level) {
      case "easy":
        mediumButton.classList.remove("active");
        hardButton.classList.remove("active");
        keyboardEASY.classList.remove("hidden");
        keyboardMEDIUM.classList.add("hidden");
        break;

      case "medium":
        if (!document.querySelector(".keyboard-medium").hasChildNodes()) {
          createMediumKeyboard();
        }

        easyButton.classList.remove("active");
        hardButton.classList.remove("active");
        keyboardEASY.classList.add("hidden");
        keyboardMEDIUM.classList.remove("hidden");
        break;

      case "hard":
        if (!document.querySelector(".keyboard-medium").hasChildNodes()) {
          createMediumKeyboard();
        }

        easyButton.classList.remove("active");
        mediumButton.classList.remove("active");
        keyboardEASY.classList.remove("hidden");
        keyboardMEDIUM.classList.remove("hidden");
        break;
    }
  }
};

export async function virtualKeyboardHandler(event) {
  let char;
  let button;
  if (state.isGameStarted) {
    if (!event.key) {
      button = event.target;
    } else {
      for (let i = 0; i < allKeyboardButtons.length; i++) {
        if (allKeyboardButtons[i].textContent === `${event.code}`.slice(-1)) {
          button = allKeyboardButtons[i];
        }
      }
    }
    button.classList.add("show-button");
    for (let j = 0; j < allKeyboardButtons.length; j++) {
      let key = allKeyboardButtons[j];
      char = allKeyboardButtons[j].textContent;
      if (button === key && !event.key) {
        textLine.value += char;
        checkInput(char, state.position);
        setState("position", state.position + 1);
      }
    }
    await delay(400);
    button.classList.remove("show-button");
  }
}

async function showSequence(string) {
  removeEventListenerForKeyboard();
  window.removeEventListener("keypress", inputFromKeyboard);
  repeatSequenceButton.classList.add("disabled");
  newGameButton.classList.add("disabled");
  [...allKeyboardButtons].map((button) => button.classList.add("disabled"));

  let elemToShow;
  for (let i = 0; i < string.length; i++) {
    for (let elem in allKeyboardButtons) {
      if (string[i] === allKeyboardButtons[elem].innerText) {
        elemToShow = allKeyboardButtons[elem];
        await delay(500);
        elemToShow.classList.add("show-button");
      }
    }
    await delay(1000);
    elemToShow.classList.remove("show-button");
    await delay(500);
  }

  if (state.isSequenceRepeated) {
    repeatSequenceButton.classList.add("disabled");
  } else {
    repeatSequenceButton.classList.remove("disabled");
  }

  [...allKeyboardButtons].map((button) => button.classList.remove("disabled"));
  newGameButton.classList.remove("disabled");
  window.addEventListener("keypress", inputFromKeyboard);
  addEventListenerForKeyboard();
}

export const startGameButtonClickHandler = (event) => {
  event.target.classList.add("hidden");
  roundCounter.classList.remove("hidden");
  repeatSequenceButton.classList.remove("hidden");
  newGameButton.classList.remove("hidden");

  const sequence = createSequence(state.sequenceLength, state.difficulty);

  disabledLevelChoice();
  showSequence(sequence);

  setState("sequence", sequence);
  setState("sequenceLength", state.sequenceLength + 2);
  setState("isGameStarted", true);

  console.log(sequence);
};

export const repeatSequenceButtonClickHandler = (event) => {
  if (!event.target.classList.contains("disabled")) {
    errorMessage.classList.add("hidden");
    setState("position", 0);
    textLine.value = "";
    showSequence(state.sequence);
    setState("isSequenceRepeated", true);
  }
};

export const nextButtonClickHandler = (event) => {
  if (!event.target.classList.contains("disabled")) {
    setState("isSequenceRepeated", false);
    setState("position", 0);
    setState("errorCounter", 0);
    textLine.value = "";
    successMessage.classList.add("hidden");
    roundCounter.innerText = `Round ${state.successCounter + 1}/5`;

    const sequence = createSequence(state.sequenceLength, state.difficulty);

    showSequence(sequence);
    setState("sequence", sequence);
    setState("sequenceLength", state.sequenceLength + 2);
    nextButton.classList.add("hidden");
    repeatSequenceButton.classList.remove("hidden");

    console.log(sequence);
  }
};

export const newGameButtonClickHandler = (event) => {
  if (!event.target.classList.contains("disabled")) {
    startButton.classList.remove("hidden");
    roundCounter.classList.add("hidden");
    repeatSequenceButton.classList.add("hidden");
    newGameButton.classList.add("hidden");
    nextButton.classList.add("hidden");
    nextButton.classList.remove("disabled");
    successMessage.classList.add("hidden");
    errorMessage.classList.add("hidden");
    setState("sequenceLength", 2);
    setState("isGameStarted", true);
    setState("sequence", "");
    setState("position", 0);
    setState("isSequenceRepeated", false);
    setState("errorCounter", 0);
    setState("successCounter", 0);
    roundCounter.innerText = `Round ${state.successCounter + 1}/5`;
    textLine.value = "";
    ableLevelChoice();
  }
};

export function inputFromKeyboard(event) {
  if (state.isGameStarted) {
    let char = `${event.code}`.slice(-1);
    if (`${event.code}`.slice(0, 6) === "Numpad") {
      char = "";
    }
    if (state.difficulty === "easy" && isNaN(Number(char))) {
      char = "";
    }
    if (state.difficulty === "medium" && !isNaN(Number(char))) {
      char = "";
    }
    if (char !== "") {
      textLine.value += char;
      virtualKeyboardHandler(event);
      checkInput(char, state.position);
      setState("position", state.position + 1);
    }
  }
}
