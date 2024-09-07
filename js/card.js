export default class Card {
  constructor(emoji) {
    this.emoji = emoji;
    this.flipped = false;
    this.element = document.createElement('div');
    this.createElement();
  }

  createElement() {
    this.element.classList.add('card');

    this.element.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back">
          <img src="${this.emoji}" alt="emoji">
        </div>
      </div>
`;
  }

  showEmoji() {
    this.flipped = true;
    this.element.classList.add('open');
  }

  hideEmoji() {
    this.flipped = false;
    this.element.classList.remove('open');
  }
};
