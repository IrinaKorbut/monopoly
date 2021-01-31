import Game from '../Game/Game';


export function createElement(elementType?: any, elementsClassList?: any, elementInnerText?: any) {
  const element: any = document.createElement(elementType);
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

export function appendElementTo(parent: any, ...elements: any) {
  if (parent) {
    elements.forEach((element: any) => parent.appendChild(element));
  }
}

export function removeChildsFromElement(element: any) {
  while (element.childNodes.length !== 0) {
    element.removeChild(element.firstChild);
  }
}



export function checkIsHuman() {   
  const allButton: HTMLElement[] = Array.from(document.querySelectorAll('.button'))
  allButton.forEach((button: HTMLElement) => {
    if (!Game.activePlayer.isHuman && !button.classList.contains('inactive__button')) {
      button.classList.add('inactive__button');
    } 
    if (Game.activePlayer.isHuman) {
      button.classList.remove('inactive__button');
    }
  })  
}