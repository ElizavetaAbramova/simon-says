let arrayOfNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let arrayOfChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let arrayOfSymbols = arrayOfChars.concat(arrayOfNums);
let isGameStarted = false;
let sequenceLength = 2;
let difficulty = '';
let sequence;
let position = 0;
let isSequenceRepeated = false;
let errorCounter = 0;
let successCounter = 0;

const body = document.querySelector('.body');
const mainSection = document.createElement('section');
mainSection.classList.add('main');
body.append(mainSection);

const levelBlock = document.createElement('div');
levelBlock.classList.add('levelBlock');
mainSection.append(levelBlock);

const easyButton = document.createElement('div');
easyButton.innerText = 'Easy';
easyButton.classList.add('button', 'level-button', 'easy', 'active');
levelBlock.append(easyButton);

const mediumButton = document.createElement('div');
mediumButton.innerText = 'Medium';
mediumButton.classList.add('button', 'level-button', 'medium');
levelBlock.append(mediumButton);

const hardButton = document.createElement('div');
hardButton.innerText = 'Hard';
hardButton.classList.add('button', 'level-button', 'hard');
levelBlock.append(hardButton);

const controlButtons = document.createElement('div');
controlButtons.classList.add('control-buttons');
mainSection.append(controlButtons);

const newGameButton = document.createElement('div');
newGameButton.innerText = 'New Game';
newGameButton.classList.add('button', 'new-game', 'hidden');
controlButtons.append(newGameButton);

const repeatSequenceButton = document.createElement('div');
repeatSequenceButton.innerText = 'Repeat the sequence';
repeatSequenceButton.classList.add('button', 'repeat-sequence', 'hidden');
controlButtons.append(repeatSequenceButton);

const roundCounter = document.createElement('div');
roundCounter.innerText = `Round ${1}/5`;
roundCounter.classList.add('round', 'hidden');
mainSection.append(roundCounter);

const textLine = document.createElement('input');
textLine.classList.add('text-line');
textLine.value = '';
textLine.readOnly = true;
textLine.type = 'text';
textLine.id = 'text-line';
mainSection.append(textLine);

const messageBlock = document.createElement('div');
messageBlock.classList.add('message-block');
mainSection.append(messageBlock);

const errorMessage = document.createElement('div');
errorMessage.classList.add('error-message', 'hidden');
messageBlock.append(errorMessage);

const successMessage = document.createElement('div');
successMessage.classList.add('success-message', 'hidden');
messageBlock.append(successMessage);

const startButton = document.createElement('div');
startButton.classList.add('start-button', 'button');
startButton.innerText = 'START';
mainSection.append(startButton);

const nextButton = document.createElement('div');
nextButton.classList.add('next-button', 'button', 'hidden');
nextButton.innerText = 'Next';
controlButtons.append(nextButton);

const keyboardBlock = document.createElement('div');
keyboardBlock.classList.add('keyboard-block');
mainSection.append(keyboardBlock);

const keyboardEASY = document.createElement('div');
keyboardEASY.classList.add('keyboard', 'keyboard-easy');
keyboardBlock.append(keyboardEASY);

const keyboardMEDIUM = document.createElement('div');
keyboardMEDIUM.classList.add('keyboard', 'keyboard-medium', 'hidden');
keyboardBlock.append(keyboardMEDIUM);

function createEasyKeyboard() {
  for (let i = 0; i < 10; i++) {
    let keyboardButton = document.createElement('div');
    keyboardButton.innerText = `${i}`;
    keyboardButton.classList.add('button', `button-${i}`, 'key-button', 'key-button-easy');
    keyboardEASY.append(keyboardButton);
  }
}

function createMediumKeyboard() {
  for (let i = 65; i < 91; i++) {
    let keyboardButton = document.createElement('div');
    keyboardButton.innerText = `${String.fromCharCode(i)}`;
    keyboardButton.classList.add('button', `button-${String.fromCharCode(i)}`, 'key-button', 'key-button-medium');
    keyboardMEDIUM.append(keyboardButton);
  }
}

document.onload = createEasyKeyboard();
document.onload = createMediumKeyboard();
let allKeyboardButtons = document.querySelectorAll('.key-button');

easyButton.addEventListener('click', () => {
  if (!easyButton.classList.contains('active') && !easyButton.classList.contains('disabled')) {
    easyButton.classList.add('active');
    mediumButton.classList.remove('active');
    hardButton.classList.remove('active');
    keyboardEASY.classList.remove('hidden');
    keyboardMEDIUM.classList.add('hidden');
  }
})

mediumButton.addEventListener('click', () => {
  if (!mediumButton.classList.contains('active') && !mediumButton.classList.contains('disabled')) {
    mediumButton.classList.add('active');
    easyButton.classList.remove('active');
    hardButton.classList.remove('active');
    keyboardEASY.classList.add('hidden');
    keyboardMEDIUM.classList.remove('hidden');
  }
})

hardButton.addEventListener('click', () => {
  if (!hardButton.classList.contains('active') && !hardButton.classList.contains('disabled')) {
    hardButton.classList.add('active');
    mediumButton.classList.remove('active');
    easyButton.classList.remove('active');
    keyboardEASY.classList.remove('hidden');
    keyboardMEDIUM.classList.remove('hidden');
  }
})

function createSequence(length, level) {
  let sequence = '';
  let char;
  if (level === 'easy') {
    for (let i = 0; i < length; i++) {
      char = Math.floor(Math.random() * arrayOfNums.length);
      sequence += arrayOfNums[char];
    }
  }
  if (level === 'medium') {
    for (let i = 0; i < length; i++) {
      char = Math.floor(Math.random() * arrayOfChars.length);
      sequence += arrayOfChars[char];
    }
  }
  if (level === 'hard') {
    for (let i = 0; i < length; i++) {
      char = Math.floor(Math.random() * arrayOfSymbols.length);
      sequence += arrayOfSymbols[char];
    }
  }
  return sequence; //sequence is string
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function showSequence(string) {
  removeEventListenerForKeyboard();
  window.removeEventListener('keypress', inputFromKeyboard);
  repeatSequenceButton.classList.add('disabled');
  newGameButton.classList.add('disabled');
  let elemToShow;

  for (let j = 0; j < allKeyboardButtons.length; j++) {
    let button = allKeyboardButtons[j];
    button.classList.add('disabled');
  }
  for (let i = 0; i < string.length; i++) {
    for (let elem in allKeyboardButtons) {
      if (string[i] === allKeyboardButtons[elem].innerText) {
        elemToShow = allKeyboardButtons[elem];
        await delay(500);
        elemToShow.classList.add('show-button');
      }
    }
    await delay(1000);
    elemToShow.classList.remove('show-button');
    await delay(500)
  }
  for (let j = 0; j < allKeyboardButtons.length; j++) {
    let button = allKeyboardButtons[j];
    button.classList.remove('disabled');
  }
  if (isSequenceRepeated) {
    repeatSequenceButton.classList.add('disabled');
  } else {
    repeatSequenceButton.classList.remove('disabled');
  }
  window.addEventListener('keypress', inputFromKeyboard);
  addEventListenerForKeyboard();
  newGameButton.classList.remove('disabled');
}

function disabledLevelChoice() {
  let levelButtons = document.querySelectorAll('.level-button');
  for (let i = 0; i < levelButtons.length; i++) {
    if (!levelButtons[i].classList.contains('active')) {
      levelButtons[i].classList.add('disabled');
      levelButtons[i].title = 'start new game to change difficulty';
    } else {
      difficulty = levelButtons[i].classList[2];
    }
  }
}

function ableLevelChoice() {
  let levelButtons = document.querySelectorAll('.level-button');
  for (let i = 0; i < levelButtons.length; i++) {
    if (!levelButtons[i].classList.contains('active')) {
      levelButtons[i].classList.remove('disabled');
      levelButtons[i].title = 'choose difficulty';
    }
  }
}

startButton.addEventListener('click', () => {
  startButton.classList.add('hidden');
  roundCounter.classList.remove('hidden');
  repeatSequenceButton.classList.remove('hidden');
  newGameButton.classList.remove('hidden');
  disabledLevelChoice();
  sequence = createSequence(sequenceLength, difficulty);
  showSequence(sequence);
  console.log(sequence);
  sequenceLength += 2;
  isGameStarted = true;
})

function checkInput(key, index) {
  if(sequence[index] !== key) {
    errorCounter++;
    errorMessage.classList.remove('hidden');
    errorMessage.innerText = 'Ooops! You did a mistake';
    window.removeEventListener('keypress', inputFromKeyboard);
    removeEventListenerForKeyboard();
    if (errorCounter === 2) {
      errorMessage.innerText = 'Game Over';
    }
  }
  if (index === sequence.length - 1 && sequence[index] === key) {
    successCounter++;
    successMessage.classList.remove('hidden');
    successMessage.innerText = 'All right!';
    position = 0;
    nextButton.classList.remove('hidden');
    repeatSequenceButton.classList.add('hidden');
    window.removeEventListener('keypress', inputFromKeyboard);
    removeEventListenerForKeyboard();
    if (successCounter === 5) {
      successMessage.innerText = 'Congratulations, you win!';
      nextButton.classList.add('hidden');
      repeatSequenceButton.classList.add('disabled');
      repeatSequenceButton.classList.remove('hidden');
      removeEventListenerForKeyboard();
      window.removeEventListener('keypress', inputFromKeyboard);
    }
  }
}

function inputFromKeyboard(event) {
  if (isGameStarted) {
    let char = `${event.code}`.slice(-1);
    if (`${event.code}`.slice(0, 6) === 'Numpad') {
      char = '';
    }
    if (difficulty === 'easy' && isNaN(Number(char))) {
      char = '';
    }
    if (difficulty === 'medium' && !isNaN(Number(char))) {
      char = '';
    }
    if (char !== '') {
      textLine.value += char;
      virtualKeyboardHandler(event);
      checkInput(char, position);
      position++;
    }
  }
}

repeatSequenceButton.addEventListener('click', () => {
  if (!repeatSequenceButton.classList.contains('disabled')) {
    errorMessage.classList.add('hidden');
    position = 0;
    textLine.value = '';
    showSequence(sequence);
    isSequenceRepeated = true;
  }
})

nextButton.addEventListener('click', () => {
  if (!nextButton.classList.contains('disabled')) {
    isSequenceRepeated = false;
    position = 0;
    textLine.value = '';
    successMessage.classList.add('hidden');
    errorCounter = 0;
    roundCounter.innerText = `Round ${successCounter + 1}/5`;
    sequence = createSequence(sequenceLength, difficulty);
    showSequence(sequence);
    console.log(sequence);
    sequenceLength += 2;
    nextButton.classList.add('hidden');
    repeatSequenceButton.classList.remove('hidden');
  }
})

newGameButton.addEventListener('click', () => {
  //use current difficulty
  if (!newGameButton.classList.contains('disabled')) {
    startButton.classList.remove('hidden');
    roundCounter.classList.add('hidden');
    repeatSequenceButton.classList.add('hidden');
    newGameButton.classList.add('hidden');
    nextButton.classList.add('hidden');
    nextButton.classList.remove('disabled');
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');
    sequenceLength = 2;
    isGameStarted = true;
    sequence = '';
    position = 0;
    isSequenceRepeated = false;
    errorCounter = 0;
    successCounter = 0;
    roundCounter.innerText = `Round ${successCounter + 1}/5`;
    textLine.value = '';
    ableLevelChoice();
  }
})

async function virtualKeyboardHandler(event) {
  let char;
  let button;
  if (isGameStarted) {
    if (!event.key) {
      button = event.target;
    } else {
      for (let i = 0; i < allKeyboardButtons.length; i++) {
        if (allKeyboardButtons[i].textContent === `${event.code}`.slice(-1)) {
          button = allKeyboardButtons[i];
        }
      }
    }
    button.classList.add('show-button');
    for (let j = 0; j < allKeyboardButtons.length; j++) {
      let key = allKeyboardButtons[j];
      char = allKeyboardButtons[j].textContent;
      if (button === key && !event.key) {
        textLine.value += char;
        checkInput(char, position);
        position++;
      }
    }
    await delay(400);
    button.classList.remove('show-button');
  }
}

function addEventListenerForKeyboard() {
  for (let i = 0; i < allKeyboardButtons.length; i++) {
    allKeyboardButtons[i].addEventListener('click', virtualKeyboardHandler);
  }
}

function removeEventListenerForKeyboard() {
  for (let i = 0; i < allKeyboardButtons.length; i++) {
    allKeyboardButtons[i].removeEventListener('click', virtualKeyboardHandler);
  }
}