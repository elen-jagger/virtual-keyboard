/* eslint-disable max-classes-per-file */
class KeyButton {
  constructor(options) {
    this.options = options;
  }

  onClick = () => {
    if (this.key.classList.contains('keyboard__btn_symbol') || this.key.classList.contains('keyboard__btn_space')) {
      document.querySelector('textarea').value += this.key.textContent;
    }
  }

  onKeyDown = () => {
    this.key.classList.add('keyboard__btn_pressed');
  }

  onKeyUp = () => {
    this.key.classList.remove('keyboard__btn_pressed');
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

    this.key = key;
    return key;
  }
}

class Keyboard {
  constructor(lang, parent) {
    this.lang = lang;
    this.parent = parent;
  }

  render() {
    for (let i = 0; i < this.lang.length; i += 1) {
      const row = document.createElement('div');
      row.className = 'keyboard__row';
      this.parent.appendChild(row);

      const rowLength = this.lang[i].length;
      for (let j = 0; j < rowLength; j += 1) {
        const key = new KeyButton(this.lang[i][j]);
        row.appendChild(key.render());
      }
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

  const keyboard = new Keyboard(en, keyboardContainer);
  keyboard.render();
}

document.addEventListener('DOMContentLoaded', makeLayout);
