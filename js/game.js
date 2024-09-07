import Card from './card.js';

export default class Game {
  constructor() {
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.cardEmojies = [
      './assets/arı.png',
      './assets/civciv.png',
      './assets/ejderha.png',
      './assets/flamingo.png',
      './assets/hamster.png',
      './assets/köpek.png',
      './assets/unicorn.png',
      './assets/yonca.png'
    ];
    this.generateCards();
  }

  generateCards() {
    // Duplicate emojies to have 2 instance of each emoji
    this.cardEmojies = [...this.cardEmojies, ...this.cardEmojies];
    // Shuffle the emoji addresses
    this.shuffleEmojies();
    // For each emojiAddress create a card object and add the cards array
    for (const emojiAddress of this.cardEmojies) {
      const card = new Card(emojiAddress);
      this.cards.push(card);
    }

    // Take the game board element from dom and clear its inner html
    const board = document.getElementById('game-board');
    board.innerHTML = '';

    // for each card in the cards array add the card.element (html element) to the board and listen for click
    for (const card of this.cards) {
      board.append(card.element);
      card.element.addEventListener('click', ()=>this.flipCard(card));
    }
  }

  shuffleEmojies() {
    for(let i = this.cardEmojies.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements array[i] and array[j];
      [this.cardEmojies[i], this.cardEmojies[j]] = [this.cardEmojies[j], this.cardEmojies[i]];
    }
  }

  async flipCard(card) {
    // check if the card is already flipped
    if (card.flipped || this.flippedCards.length === 2)
      return;

    // if not call showEmoji function of the card that makes flipped porperty true and add 'open' class name to the card
    card.showEmoji();
    // Add the card to the flippedCards array
    this.flippedCards.push(card);

    // If flippedCards has a 2 card inside check for matching, then reset the flippedCards array
    if (this.flippedCards.length == 2){
      await this.checkMatch();
      this.flippedCards = [];
    }
  }

  checkMatch() {
    // Get the first card and the second card from the flippedCards array
    const [firstCard, secondCard] = this.flippedCards;
    // If they have a same emoji address check for if the game is over
    if (firstCard.emoji === secondCard.emoji) {
      this.isGameOver();
    }
    else {
      // If they not wait 800ms to show cards to the player, then flip back firstCard and secondCard 
      return new Promise(res => setTimeout(() => {
        firstCard.hideEmoji();
        secondCard.hideEmoji();
        res();
      }, 800));
    }
  }

  isGameOver() {
    // Increase one the matchedPairs variable
    this.matchedPairs++;
    if(this.matchedPairs === 8) {
      setTimeout(() => {
        if(window.confirm('Congralations! You won! Do you want to restart the game?')){
          const newGame = new Game();
        }
      }, 1000);
    }
  }
}
