class Keyboard {
  constructor(lang, parent) {
    this.lang = lang;
    this.parent = parent;
  }

  render() {
    for (let i = 0; i < en.length; i += 1) {
      const row = document.createElement('div');
      row.className = 'keyboard__row';
      this.parent.appendChild(row);

      const rowLength = en[i].length;
      for (let j = 0; j < rowLength; j += 1) {
        const key = document.createElement('div');
        key.className = en[i][j].class;
        key.innerText = en[i][j].value;
        row.appendChild(key);
      }
    }
    // const
  }
}




// document.onload = () => {

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
