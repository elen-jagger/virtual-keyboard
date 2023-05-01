import { KeyButton } from './keyButton.js';
import { LANG_EN, LANG_RU } from '../keySets.js';

export const DEFAULT_CLASS = 'keyboard-container';

const KEYBOARD_LANG = 'key-lang';

export class Keyboard {
  constructor(keySets, parent, field) {
    this.keySets = keySets;
    this.lang = localStorage.getItem(KEYBOARD_LANG) || LANG_EN;
    this.parent = parent;
    this.keys = new Map();
    this.isShift = false;
    this.field = field;

    this.onKeydownBind = this.onKeydown.bind(this);
    this.onKeyupBind = this.onKeyup.bind(this);

    document.addEventListener('keydown', this.onKeydownBind);
    document.addEventListener('keyup', this.onKeyupBind);
  }

  render() {
    for (let i = 0; i < this.keySets[this.lang].length; i += 1) {
      const row = document.createElement('div');
      row.className = 'keyboard__row';
      this.parent.appendChild(row);

      const rowLength = this.keySets[this.lang][i].length;
      for (let j = 0; j < rowLength; j += 1) {
        const key = new KeyButton(this.keySets[this.lang][i][j], this);

        this.keys.set(this.keySets[this.lang][i][j].keycode, key);
        row.appendChild(key.render());
      }
    }
  }

  update(lang) {
    const newSet = this.keySets[lang];
    for (const [name, key] of this.keys) {
      let options;
      for (let i = 0; i < newSet.length; i++) {
        options = newSet[i].find((el) => el.keycode === name);
        if (options) { break; }
      }
      options && key.update(options);
    }
  }


  onKeydown(event) {
    this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
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
          const temp = `${textField.value.slice(0, cursorPosition)}    ${textField.value.slice(cursorPosition)}`;
          textField.value = temp;
        }
        this.keys.get(event.code.toLowerCase()).html.classList.remove('keyboard__btn_pressed');
        document.querySelector('textarea').focus();
      }, 200);
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      const key = this.keys.get(event.code.toLowerCase());
      key.html.classList.add('keyboard__btn_pressed');
      if (document.querySelector('.keyboard__btn_caps')) {
        this.shift();
        document.querySelectorAll('.keyboard__btn_letter').forEach((el) => el.textContent = el.textContent.toLowerCase());
      } else {
        this.shift();
      }
    } else if (event.code === 'CapsLock') {
      if (document.querySelector('.keyboard__btn_caps')) {
        this.toggleCaps(true);
      } else {
        this.toggleCaps(false);
      }
    } else if (event.code === 'AltLeft') {
      event.preventDefault();
      this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
      if (event.getModifierState('Control')) {
        console.log('modify');
        const newLang = this.lang === LANG_EN ? LANG_RU : LANG_EN;
        this.lang = newLang;
        localStorage.setItem(KEYBOARD_LANG, newLang);
        this.update(newLang);
      }
    } else if (event.code === 'ControlLeft') {
      this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
      if (event.getModifierState('Alt')) {
        const newLang = this.lang === LANG_EN ? LANG_RU : LANG_EN;
        this.lang = newLang;
        localStorage.setItem(KEYBOARD_LANG, newLang);
        this.update(newLang);
      }
    } else {
      this.keys.get(event.code.toLowerCase()).html.classList.add('keyboard__btn_pressed');
    }
  }

  onKeyup(event) {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      this.keys.get(event.code.toLowerCase()).html.classList.remove('keyboard__btn_pressed');
      if (document.querySelector('.keyboard__btn_caps')) {
        this.unshift();
        document.querySelectorAll('.keyboard__btn_letter').forEach((el) => el.textContent = el.textContent.toUpperCase());
      } else {
        this.unshift();
      }
    } else if (document.querySelector('.keyboard__btn_pressed')) {
      this.keys.get(event.code.toLowerCase()).html.classList.remove('keyboard__btn_pressed');
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
    for (const [name, key] of this.keys) {
      key.shift();
    }
  }

  unshift() {
    for (const [name, key] of this.keys) {
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
