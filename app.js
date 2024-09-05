const cardArray = [
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' },
    { name: 'A', img: 'A' },
    { name: 'B', img: 'B' },
    { name: 'C', img: 'C' },
    { name: 'D', img: 'D' }
];

// Shuffle the array
cardArray.sort(() => 0.5 - Math.random());

const memoryGame = document.querySelector('.memory-game');
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function createBoard() {
    cardArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.name = card.name;

        cardElement.innerHTML = `
            <div class="front">${card.img}</div>
            <div class="back">?</div>
        `;
        memoryGame.appendChild(cardElement);

        // Add event listener to flip cards
        cardElement.addEventListener('click', flipCard);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        // Second click
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}

function checkForMatch() {
    // Check if cards match
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Initialize the game board
createBoard();
