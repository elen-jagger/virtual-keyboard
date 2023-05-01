export const DEFAULT_CLASS = 'keyboard__btn';

export class KeyButton {
  constructor(options, keyboard) {
    this.options = options;
    this.keyboard = keyboard;
    this.onClickBind = this.onClick.bind(this);
    this.onKeyDownBind = this.onKeyDown.bind(this);
    this.onKeyUpBind = this.onKeyUp.bind(this);
  }

  onClick() {
    const textField = document.querySelector('textarea');
    let cursorPosition = textField.selectionEnd;
    if (this.html.textContent === 'Shift') {
      this.html.classList.add('keyboard__btn_pressed');
      if (document.querySelector('.keyboard__btn_caps')) {
        this.keyboard.toggleShift(true);
        document.querySelectorAll('.keyboard__btn_letter').forEach((el) => {
          const elem = el;
          elem.textContent = el.textContent.toLowerCase();
        });
      } else {
        this.keyboard.toggleShift(true);
      }
    } else if (this.html.classList.contains('keyboard__btn_symbol') || this.html.classList.contains('keyboard__btn_space') || this.html.classList.contains('keyboard__btn_letter') || this.html.classList.contains('keyboard__btn_comand_arrow')) {
      // todo use textarea
      const inputChar = this.html.innerText ? this.html.innerText : this.html.textContent;
      if (cursorPosition === textField.value.length) {
        textField.value += inputChar;
      } else {
        const temp1 = textField.value.slice(0, cursorPosition);
        const temp = temp1 + inputChar + textField.value.slice(cursorPosition);
        textField.value = temp;
      }

      document.querySelectorAll('[data-value="Shift"]').forEach((el) => el.classList.remove('keyboard__btn_pressed'));
      if (document.querySelector('.keyboard__btn_caps')) {
        this.keyboard.toggleShift(false);
        document.querySelectorAll('.keyboard__btn_letter').forEach((el) => {
          const elem = el;
          elem.textContent = el.textContent.toUpperCase();
        });
      } else {
        this.keyboard.toggleShift(false);
      }
    } else if (this.html.textContent === 'CapsLock') {
      if (document.querySelector('.keyboard__btn_caps')) {
        this.keyboard.toggleCaps(true);
      } else {
        this.keyboard.toggleCaps(false);
      }
    } else if (this.html.textContent === 'Enter') {
      if (cursorPosition === textField.value.length) {
        textField.value += '\n';
      } else {
        const temp = `${textField.value.slice(0, cursorPosition)}\n${textField.value.slice(cursorPosition)}`;
        textField.value = temp;
      }
    } else if (this.html.textContent === 'Tab') {
      if (cursorPosition === textField.value.length) {
        textField.value += '    ';
      } else {
        const temp = `${textField.value.slice(0, cursorPosition)}    ${textField.value.slice(cursorPosition)}`;
        textField.value = temp;
      }
    } else if (this.html.textContent === 'Backspace') {
      cursorPosition = textField.selectionEnd;
      if (cursorPosition === textField.value.length) {
        textField.value = textField.value.slice(0, (cursorPosition - 1));
      } else {
        const temp1 = textField.value.slice(0, (cursorPosition - 1));
        const temp = temp1 + textField.value.slice(cursorPosition);
        textField.value = temp;
      }
    } else if (this.html.textContent === 'Del') {
      cursorPosition = textField.selectionEnd;
      const temp1 = textField.value.slice(0, cursorPosition);
      const temp = temp1 + textField.value.slice((cursorPosition + 1));
      textField.value = temp;
    }
    textField.focus();
  }

  onKeyDown() {
    this.html.classList.add('keyboard__btn_pressed');
  }

  onKeyUp() {
    if (document.querySelector('.keyboard__btn_pressed')) {
      this.html.classList.remove('keyboard__btn_pressed');
    }
  }

  render() {
    const key = document.createElement('div');
    key.className = this.options.class;
    key.innerText = this.options.value;
    key.dataset.value = this.options.value;
    key.dataset.shiftValue = this.options.shiftValue;

    key.addEventListener('mousedown', this.onKeyDownBind);
    key.addEventListener('mouseup', this.onKeyUpBind);
    key.addEventListener('click', this.onClickBind);

    this.html = key;
    return key;
  }

  shift() {
    this.html.textContent = this.options.shiftValue;
  }

  unshift() {
    this.html.textContent = this.options.value;
  }

  update(options) {
    this.options = options;

    this.html.className = this.options.class;
    this.html.innerText = this.options.value;
    this.html.dataset.value = this.options.value;
    this.html.dataset.shiftValue = this.options.shiftValue;
  }
}
