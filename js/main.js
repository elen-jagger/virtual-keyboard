class Keyboard {
  constructor(lang, parent) {
    this.lang = lang;
    this.parent = parent;
  }

  appear(event) {
    if (event.target.classList.contains('keyboard__btn_symbol') || event.target.classList.contains('keyboard__btn_space')) {
      document.querySelector('textarea').value += event.target.textContent;
    }
  }

  render(lang) {
    for (let i = 0; i < lang.length; i += 1) {
      const row = document.createElement('div');
      row.className = 'keyboard__row';
      this.parent.appendChild(row);

      const rowLength = lang[i].length;
      for (let j = 0; j < rowLength; j += 1) {
        const key = document.createElement('div');
        key.className = lang[i][j].class;
        key.innerText = lang[i][j].value;
        key.dataset.value = lang[i][j].value;
        key.dataset.shiftValue = lang[i][j].shiftValue;
        key.addEventListener('click', this.appear);
        row.appendChild(key);
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
  keyboard.render(en);
}

document.addEventListener('DOMContentLoaded', makeLayout);
