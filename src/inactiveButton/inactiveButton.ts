export function makeAllButtonsInactiveExceptPressed(pressedButton: HTMLElement): void {
  const buttons: NodeListOf<HTMLElement>  = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    if (button !== pressedButton) {
      button.classList.add('inactive__button');
    }
  });
}

export function makeAllButtonsActive(): void {
  const buttons: NodeListOf<HTMLElement>  = document.querySelectorAll('.button');
  buttons.forEach((button) => {
    button.classList.remove('inactive__button');
  });
}