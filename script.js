document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' },
    ];
    let cards = [...cardsArray, ...cardsArray];
    cards.sort(() => 0.5 - Math.random());

    const game = document.querySelector('.memory-game');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    const resetButton = document.getElementById('reset');
    let firstCard, secondCard;
    let hasFlippedCard = false;
    let lockBoard = false;
    let matchCount = 0;
    let time = 0;
    let score = 0;
    let timer;

    // Function to start the timer
    function startTimer() {
        timer = setInterval(() => {
            time++;
            timeDisplay.textContent = time;
        }, 1000);
    }

    // Function to stop the timer
    function stopTimer() {
        clearInterval(timer);
    }

    // Function to reset the game
    function resetGame() {
        stopTimer();
        time = 0;
        score = 0;
        matchCount = 0;
        timeDisplay.textContent = time;
        scoreDisplay.textContent = score;
        hasFlippedCard = false;
        lockBoard = false;
        cards.sort(() => 0.5 - Math.random());
        game.innerHTML = '';
        createBoard();
        startTimer();
    }

    // Function to create the game board
    function createBoard() {
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;
            cardElement.innerHTML = `
                <div class="front"></div>
                <div class="back">${card.img}</div>
            `;
            cardElement.addEventListener('click', flipCard);
            game.appendChild(cardElement);
        });
    }

    // Function to flip a card
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // Function to check if two cards match
    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    // Function to disable matched cards
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        score++;
        scoreDisplay.textContent = score;
        matchCount++;
        if (matchCount === cardsArray.length) {
            stopTimer();
            alert(`Congratulations! You've won the game in ${time} seconds with a score of ${score}.`);
        }
        resetBoard();
    }

    // Function to unflip non-matched cards
    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    // Function to reset the board
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    // Initialize the game
    createBoard();
    startTimer();
    resetButton.addEventListener('click', resetGame);
});
