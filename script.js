document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = Array.from(document.querySelectorAll('.cell'));
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');

    let currentPlayer = 'X';
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkWinner() {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
                status.innerText = `Player ${currentPlayer} Wins!`;
                gameActive = false;
                return;
            }
        }
        if (cells.every(cell => cell.innerText)) {
            status.innerText = 'It\'s a Draw!';
            gameActive = false;
        }
    }

    function handleClick(event) {
        const cell = event.target;
        if (cell.innerText || !gameActive) return;

        cell.innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameActive) {
            status.innerText = `Player ${currentPlayer}'s Turn`;
        }
    }

    function resetGame() {
        cells.forEach(cell => cell.innerText = '');
        currentPlayer = 'X';
        gameActive = true;
        status.innerText = `Player ${currentPlayer}'s Turn`;
    }

    board.addEventListener('click', handleClick);
    resetButton.addEventListener('click', resetGame);
});