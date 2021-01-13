export function createElement(elementType, elementsClassList, elementInnerText) {
  const element = document.createElement(elementType);
  if (elementsClassList) {
    for (let i = 0; i < elementsClassList.length; i += 1) {
      element.classList.add(elementsClassList[i]);
    }
  }
  if (elementInnerText) {
    element.innerText = elementInnerText;
  }
  return element;
}

export function appendElementTo(parent, ...elements) {
  if (parent) {
    elements.forEach((element) => parent.appendChild(element));
  }
}

export function removeChildsFromElement(element) {
  while (element.childNodes.length !== 0) {
    element.removeChild(element.firstChild);
  }
}