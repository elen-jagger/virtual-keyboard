/* eslint-disable max-classes-per-file */
class KeyButton {
  constructor(options, keyboard) {
    this.options = options;
    this.keyboard = keyboard;
  }
//
  onClick = () => {
    const textField = document.querySelector('textarea');
    const cursorPosition = textField.selectionEnd;
    if (this.html.textContent === 'Shift') {
      this.html.classList.add('keyboard__btn_pressed');
      if (document.querySelector('.keyboard__btn_caps')) {
        this.keyboard.toggleShift(true);
        document.querySelectorAll('.keyboard__btn_letter').forEach((el) => el.textContent = el.textContent.toLowerCase());
      } else {
        this.keyboard.toggleShift(true);
      }
    } else if (this.html.classList.contains('keyboard__btn_symbol') || this.html.classList.contains('keyboard__btn_space') || this.html.classList.contains('keyboard__btn_letter')) {
      // todo use textarea
      //const cursorPosition = textField.selectionEnd;
      const inputChar = this.html.innerText ? this.html.innerText : this.html.textContent;
      if (cursorPosition === textField.value.length) {
        textField.value += inputChar;
      } else {
        const temp = textField.value.slice(0, cursorPosition) + inputChar + textField.value.slice(cursorPosition);
        textField.value = temp;
      }

      document.querySelectorAll('[data-value="Shift"]').forEach((el) => el.classList.remove('keyboard__btn_pressed'));
      if (document.querySelector('.keyboard__btn_caps')) {
        this.keyboard.toggleShift(false);
        document.querySelectorAll('.keyboard__btn_letter').forEach((el) => el.textContent = el.textContent.toUpperCase());
      } else {
        this.keyboard.toggleShift(false);
      }
    } else if (this.html.textContent === 'CapsLock') {
      if (document.querySelector('.keyboard__btn_caps')) {
        console.log('caps click');
        this.keyboard.toggleCaps(true);
      } else {
        this.keyboard.toggleCaps(false);
      }
    } else if (this.html.textContent === 'Enter') {
      if (cursorPosition === textField.value.length) {
        textField.value += '\n';
      } else {
        const temp = textField.value.slice(0, cursorPosition) + '\n' + textField.value.slice(cursorPosition);
        textField.value = temp;
      }
    } else if (this.html.textContent === 'Tab') {
      if (cursorPosition === textField.value.length) {
        textField.value += '    ';
      } else {
        const temp = textField.value.slice(0, cursorPosition) + '    ' + textField.value.slice(cursorPosition);
        textField.value = temp;
      }
    } else if (this.html.textContent === 'Backspace') {
      const cursorPosition = textField.selectionEnd;
      if (cursorPosition === textField.value.length) {
        textField.value = textField.value.slice(0, (cursorPosition - 1));
      } else {
        const temp = textField.value.slice(0, (cursorPosition - 1)) + textField.value.slice(cursorPosition);
        textField.value = temp;
      }
    } else if (this.html.textContent === 'Del') {
      const cursorPosition = textField.selectionEnd;
      const temp = textField.value.slice(0, cursorPosition) + textField.value.slice((cursorPosition + 1));
      textField.value = temp;
    }


    textField.focus();
  }

  onKeyDown = () => {
    this.html.classList.add('keyboard__btn_pressed');
  }

  onKeyUp = () => {
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

    key.addEventListener('mousedown', this.onKeyDown);
    key.addEventListener('mouseup', this.onKeyUp);
    key.addEventListener('click', this.onClick);

    this.html = key;
    return key;
  }

  shift() {
    this.html.textContent = this.options.shiftValue;
  }

  unshift() {
    this.html.textContent = this.options.value;
  }
}

class Keyboard {
  constructor(lang, parent) {
    this.lang = lang;
    this.parent = parent;
    this.keys = new Map();
    this.isShift = false;

    document.addEventListener('keydown', this.onKeydown);
    document.addEventListener('keyup', this.onKeyup);
  }

  render() {
    for (let i = 0; i < this.lang.length; i += 1) {
      const row = document.createElement('div');
      row.className = 'keyboard__row';
      this.parent.appendChild(row);

      const rowLength = this.lang[i].length;
      for (let j = 0; j < rowLength; j += 1) {
        const key = new KeyButton(this.lang[i][j], this);

        this.keys.set(en[i][j].keycode, key);
        row.appendChild(key.render());
      }
    }
  }

  onKeydown = (event) => {
    console.log('event.key', event.key);
    console.log('event.code', event.code);
    if (event.code === 'Tab') {
      event.preventDefault();
      this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
      setTimeout(() => {
        const textField = document.querySelector('textarea');
        const cursorPosition = textField.selectionEnd;
        if (cursorPosition === textField.value.length) {
          textField.value += '    ';
        } else {
          const temp = textField.value.slice(0, cursorPosition) + '    ' + textField.value.slice(cursorPosition);
          textField.value = temp;
        }
        this.keys.get(event.code.toLowerCase()).html.classList.remove('keyboard__btn_pressed');
        document.querySelector('textarea').focus();
      } , 200);
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
        if (document.querySelector('.keyboard__btn_caps')) {
          this.shift();
          document.querySelectorAll('.keyboard__btn_letter').forEach((el) => el.textContent = el.textContent.toLowerCase());
        } else {
          this.shift();
        }
    } else if (event.code === 'CapsLock') {
        if (document.querySelector('.keyboard__btn_caps')) {
          console.log('caps222 click');
          this.toggleCaps(true);
        } else {
          this.toggleCaps(false);
        }
    } else if (event.code === 'Delete') {
      //todo
    } else {
      this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
    }
  }

  onKeyup = (event) => {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.keys.get(event.code.toLowerCase()).html.classList.remove('keyboard__btn_pressed');
      if (document.querySelector('.keyboard__btn_caps')) {
        this.unshift();
        document.querySelectorAll('.keyboard__btn_letter').forEach((el) => el.textContent = el.textContent.toUpperCase());
      } else {
        this.unshift();
      }
    } else {
      if (document.querySelector('.keyboard__btn_pressed')) {
        this.keys.get(event.code.toLowerCase()).html.classList.remove('keyboard__btn_pressed');
      }
    }
  }

  toggleShift(flag) {
    if (flag !== this.isShift) {
      this.isShift = flag;

      if (this.isShift) {
        this.shift();
      } else {
        this.unshift();
      }
    }
  }

  shift() {
    for(const [name, key] of this.keys) {
      key.shift();
    }
  }

  unshift() {
    for(const [name, key] of this.keys) {
      key.unshift();
    }
  }

  toggleCaps(flag) {
    if (!flag) {
      document.querySelector('[data-value="CapsLock"]').classList.add('keyboard__btn_caps');
      document.querySelectorAll('.keyboard__btn_letter').forEach((el) => el.textContent = el.textContent.toUpperCase());
    } else {
      document.querySelector('[data-value="CapsLock"]').classList.remove('keyboard__btn_caps');
      document.querySelectorAll('.keyboard__btn_letter').forEach((el) => el.textContent = el.textContent.toLowerCase());
    }
  }
}

function makeLayout() {
  const body = document.querySelector('body');

  const textContainer = document.createElement('div');
  textContainer.className = 'text-container';
  body.appendChild(textContainer);

  const textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  textContainer.appendChild(textarea);

  const note = document.createElement('div');
  note.className = 'note';
  textContainer.appendChild(note);
  const p = document.createElement('p');
  p.innerText = 'Keyboard made in OS Windows. \n\n Language switch: left ctrl + alt.';
  note.appendChild(p);

  const keyboardContainer = document.createElement('div');
  keyboardContainer.className = 'keyboard-container';
  body.appendChild(keyboardContainer);

  const field = new Textarea();

  const keyboard = new Keyboard(en, keyboardContainer);
  keyboard.render();

  document.querySelector('textarea').focus();
}

class Textarea {
  constructor() {
    this.textarea = document.querySelector('.textarea');
    document.addEventListener('keydown', this.onKeydown);
  }

  onKeydown = () => {
    this.textarea.focus();
  }
}


document.addEventListener('DOMContentLoaded', makeLayout);
