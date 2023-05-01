import { Textarea } from './components/textarea.js';
import { Keyboard } from './components/keyboard.js';
import { keySets } from './keySets.js';

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
  p.innerText = 'Keyboard made in OS Windows. \n\n Language switch: left ctrl + left alt.';
  note.appendChild(p);

  const keyboardContainer = document.createElement('div');
  keyboardContainer.className = 'keyboard-container';
  body.appendChild(keyboardContainer);

  const field = new Textarea();

  const keyboard = new Keyboard(keySets, keyboardContainer, field);
  keyboard.render();

  document.querySelector('textarea').focus();
}

document.addEventListener('DOMContentLoaded', makeLayout);
