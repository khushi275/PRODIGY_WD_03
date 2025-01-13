const board = document.getElementById("game-board");
const resetButton = document.getElementById("reset-btn");
let currentPlayer = 'X'; // X always starts
let gameState = ['', '', '', '', '', '', '', '', '']; // 9 spots on the board

// Create the 9 cells
function createBoard() {
  board.innerHTML = ''; // Clear the board
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.setAttribute('data-index', index);
    cellElement.textContent = cell;
    cellElement.addEventListener('click', handleCellClick);
    board.appendChild(cellElement);
  });
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  if (gameState[index] === '') {
    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWinner()) {
      alert(`${currentPlayer} wins!`);
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
  }
}

// Check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return true;
    }
  }
  return false;
}

// Reset the game
function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  createBoard();
}

resetButton.addEventListener('click', resetGame);

// Initialize the game
createBoard();
