export class Textarea {
  constructor() {
    this.textarea = document.querySelector('.textarea');
    document.addEventListener('keydown', this.onKeydown);
  }

  onKeydown = () => {
    this.textarea.focus();
  }
}
