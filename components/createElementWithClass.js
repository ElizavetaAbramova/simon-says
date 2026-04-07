export function createElementWithClass(tag, className, text = "") {
  const element = document.createElement(tag);
  if (className.includes(" ")) {
    const classNames = className.split(" ");
    classNames.forEach((name) => element.classList.add(name));
  } else {
    element.classList.add(className);
  }

  element.innerText = text;
  return element;
}
