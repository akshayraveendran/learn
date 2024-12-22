const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let cells = Array(9).fill(null);

// Create the board
function createBoard() {
    board.innerHTML = '';
    cells = Array(9).fill(null);
    status.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', makeMove);
        board.appendChild(cell);
    });
}

// Handle moves
function makeMove(event) {
    const index = event.target.dataset.index;

    if (!cells[index]) {
        cells[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add('taken');

        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} Wins! 🎉`;
            endGame();
        } else if (cells.every(cell => cell)) {
            status.textContent = `It's a Draw! 🤝`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

// Check for a win
function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

// End game
function endGame() {
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', makeMove));
}

// Restart the game
resetButton.addEventListener('click', () => {
    currentPlayer = 'X';
    createBoard();
});

// Initialize the game
createBoard();
