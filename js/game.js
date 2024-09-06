import Card from './card.js';

export default class Game {
  constructor(size) {
    this.size = size;
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.generateCards();
  }

  generateCards() {
    const values = ['../assets/arı.png',
                    '../assets/yonca.png',
                    '../assets/civciv.png',
                    '../assets/köpek.png',
                    '../assets/ejderha.png',
                    '../assets/hamster.png',
                    '../assets/unicorn.png',
                    '../assets/flamingo.png'];
    const cardValues = [...values, ...values];
    this.shuffle(cardValues);

    for (let value of cardValues) {
      this.cards.push(new Card(value));
    }
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  flipCard(index) {
    if (this.flippedCards.length === 2 || this.cards[index].flipped) return;

    this.cards[index].flipped = true;
    this.flippedCards.push(index);

    if (this.flippedCards.length === 2) {
      this.checkMatch();
    }
  }

  checkMatch() {
    const [firstIndex, secondIndex] = this.flippedCards;
    const firstCard = this.cards[firstIndex];
    const secondCard = this.cards[secondIndex];

    if (firstCard.value === secondCard.value) {
      firstCard.matched = true;
      secondCard.matched = true;
      this.matchedPairs++;
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
      }, 1000);
    }
    
    this.flippedCards = [];
  }

  isGameOver() {
    return this.matchedPairs === this.size / 2;
  }

}
