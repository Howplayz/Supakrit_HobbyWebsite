(function() {
    const emojis = ['🎮', '📷', '🍳', '🏆', '🌅', '🎯'];
    const cardData = [...emojis, ...emojis];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let lockBoard = false;

    const grid = document.getElementById('memoryGrid');
    const moveCountEl = document.getElementById('moveCount');
    const pairCountEl = document.getElementById('pairCount');
    const winMsg = document.getElementById('winMsg');
    const resetBtn = document.getElementById('resetGame');

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function createBoard() {
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        lockBoard = false;
        moveCountEl.textContent = '0';
        pairCountEl.textContent = '0';
        winMsg.classList.remove('show');

        const shuffled = shuffle([...cardData]);
        shuffled.forEach((emoji, index) => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            card.innerHTML = `
                <div class="memory-card-inner">
                    <div class="memory-card-front"></div>
                    <div class="memory-card-back">${emoji}</div>
                </div>
            `;
            card.addEventListener('click', () => flipCard(card));
            grid.appendChild(card);
        });
    }

    function flipCard(card) {
        if (lockBoard) return;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
        if (flippedCards.length >= 2) return;

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            moveCountEl.textContent = moves;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            pairCountEl.textContent = matchedPairs;
            flippedCards = [];
            if (matchedPairs === emojis.length) {
                setTimeout(() => winMsg.classList.add('show'), 400);
            }
        } else {
            lockBoard = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 800);
        }
    }

    resetBtn.addEventListener('click', createBoard);
    createBoard();
})();
