/* eslint-disable max-classes-per-file */
class KeyButton {
  constructor(options) {
    this.options = options;
  }
//
  onClick = () => {
    if (this.html.classList.contains('keyboard__btn_symbol') || this.html.classList.contains('keyboard__btn_space')) {
      document.querySelector('textarea').value += this.html.textContent;
    }
  }

  onKeyDown = () => {
    this.html.classList.add('keyboard__btn_pressed');
  }

  onKeyUp = () => {
    this.html.classList.remove('keyboard__btn_pressed');
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
}

class Keyboard {
  constructor(lang, parent) {
    this.lang = lang;
    this.parent = parent;
    this.keys = new Map();

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
        const key = new KeyButton(this.lang[i][j]);

        this.keys.set(en[i][j].keycode, key);
        row.appendChild(key.render());
      }
    }
  }

  onKeydown = (event) => {
    console.log('event.key', event.key);
    console.log('event.code', event.code);
    //console.log('this.html.classList', this.html.classList);
    if ( event.code === 'Tab') {
      console.log('tab up');
      this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
      setTimeout(() => this.keys.get(event.code.toLowerCase()).html.classList.remove('keyboard__btn_pressed'), 200);
    } else {
      this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
    }
  }

  onKeyup = (event) => {
    console.log('event.key', event.key);
    console.log('event.code', event.code);
    this.keys.get(event.code.toLowerCase()).html.classList.remove('keyboard__btn_pressed');
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
