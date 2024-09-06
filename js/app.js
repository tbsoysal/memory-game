import Game from './game.js';

const boardElement = document.getElementById('game-board');
const game = new Game(16);

function createCardElement(card, index) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  if(card.flipped)
    cardElement.classList.add('open');
  else
    cardElement.classList.remove('open');
  cardElement.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
          </div>
          <div class="card-back">
            <img src=${card.value} alt="emoji">
          </div>
        </div>
`
  cardElement.addEventListener('click', () => handleCardClick(index));
  return cardElement;
}

function renderBoard() {
  boardElement.innerHTML = '';
  game.cards.forEach((card, index) => {
    const cardElement = createCardElement(card, index);
    boardElement.append(cardElement);
  });
}

function handleCardClick(index) {
  if (game.isGameOver()) return;
  
  game.flipCard(index);
  renderBoard();

  if (game.isGameOver()) {
    setTimeout(() => {
      alert('Congratulations! You won!')
    }, 100);
  }
}

renderBoard();
