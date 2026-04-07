import { arrayOfChars, arrayOfNumbers, arrayOfSymbols } from "./constants.js";

export function createSequence(length, level) {
  let sequence = "";
  let char;
  if (level === "easy") {
    for (let i = 0; i < length; i++) {
      char = Math.floor(Math.random() * arrayOfNumbers.length);
      sequence += arrayOfNumbers[char];
    }
  }
  if (level === "medium") {
    for (let i = 0; i < length; i++) {
      char = Math.floor(Math.random() * arrayOfChars.length);
      sequence += arrayOfChars[char];
    }
  }
  if (level === "hard") {
    for (let i = 0; i < length; i++) {
      char = Math.floor(Math.random() * arrayOfSymbols.length);
      sequence += arrayOfSymbols[char];
    }
  }
  return sequence;
}
