document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restartButton');
    const message = document.getElementById('message');
    
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function handleCellClick(e) {
        const index = e.target.getAttribute('data-index');

        if (gameState[index] || checkWinner()) {
            return;
        }

        gameState[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            return;
        }

        if (gameState.every(cell => cell)) {
            message.textContent = 'It\'s a tie!';
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    }

    function restartGame() {
        gameState.fill(null);
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        message.textContent = '';
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
});
