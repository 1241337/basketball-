let scorePlayer = 0;
let scoreOpponent = 0;
let currentQuarter = 1;
let gameOver = false;
let currentBallHandler = '';
let gameLog = [];

// Player and opponent stats
const playerTeam = {
    "Player 1": { shooting: 7, passing: 6, defense: 5, energy: 100 },
    "Player 2": { shooting: 6, passing: 7, defense: 6, energy: 100 },
    "Player 3": { shooting: 8, passing: 5, defense: 6, energy: 100 }
};

const opponentTeam = {
    "Opponent 1": { shooting: 6, passing: 6, defense: 7, energy: 100 },
    "Opponent 2": { shooting: 7, passing: 6, defense: 6, energy: 100 },
    "Opponent 3": { shooting: 6, passing: 7, defense: 5, energy: 100 }
};

let gameLogElement = document.getElementById('game-log');
let statusElement = document.getElementById('game-status');

function updateGameStatus(message) {
    statusElement.innerHTML = message;
    gameLog.push(message);
    renderGameLog();
}

function renderGameLog() {
    gameLogElement.innerHTML = '';
    gameLog.forEach((log, index) => {
        gameLogElement.innerHTML += `<p>${log}</p>`;
    });
}

// Function to simulate shooting
function shoot(player) {
    let chance = Math.random();
    let shootingAccuracy = playerTeam[player] ? playerTeam[player].shooting : opponentTeam[player].shooting;
    return chance < shootingAccuracy / 10;
}

// Function to simulate a pass
function passBall(team) {
    let players = team === 'player' ? Object.keys(playerTeam) : Object.keys(opponentTeam);
    let newHandler = players[Math.floor(Math.random() * players.length)];
    return newHandler;
}

// Function to simulate a quarter
function simulateQuarter() {
    if (gameOver) return;

    // Player's turn
    let playerAction = Math.floor(Math.random() * 4) + 1;
    let player = passBall('player');
    if (playerAction === 1) {
        // Simulate shooting
        if (shoot(player)) {
            scorePlayer += 2;
            updateGameStatus(`${player} scores a 2-point shot!`);
        } else {
            updateGameStatus(`${player} misses a 2-point shot.`);
        }
    } else if (playerAction === 2) {
        // Simulate shooting a 3-point shot
        if (shoot(player)) {
            scorePlayer += 3;
            updateGameStatus(`${player} scores a 3-point shot!`);
        } else {
            updateGameStatus(`${player} misses a 3-point shot.`);
        }
    } else if (playerAction === 3) {
        // Simulate a pass
        let newHandler = passBall('player');
        updateGameStatus(`${player} passes the ball to ${newHandler}.`);
    }

    // Opponent's turn
    let opponentAction = Math.floor(Math.random() * 4) + 1;
    let opponent = passBall('opponent');
    if (opponentAction === 1) {
        // Simulate shooting
        if (shoot(opponent)) {
            scoreOpponent += 2;
            updateGameStatus(`${opponent} scores a 2-point shot!`);
        } else {
            updateGameStatus(`${opponent} misses a 2-point shot.`);
        }
    } else if (opponentAction === 2) {
        // Simulate shooting a 3-point shot
        if (shoot(opponent)) {
            scoreOpponent += 3;
            updateGameStatus(`${opponent} scores a 3-point shot!`);
        } else {
            updateGameStatus(`${opponent} misses a 3-point shot.`);
        }
    } else if (opponentAction === 3) {
        // Simulate a pass
        let newHandler = passBall('opponent');
        updateGameStatus(`${opponent} passes the ball to ${newHandler}.`);
    }

    // Check if the game is over
    if (currentQuarter > 4) {
        gameOver = true;
        if (scorePlayer > scoreOpponent) {
            updateGameStatus("Game over! Player wins!");
        } else if (scoreOpponent > scorePlayer) {
            updateGameStatus("Game over! Opponent wins!");
        } else {
            updateGameStatus("Game over! It's a tie!");
        }
    }
}

// Function to start the game
function startGame() {
    if (!gameOver) {
        if (currentQuarter <= 4) {
            updateGameStatus(`Quarter ${currentQuarter} in progress...`);
            simulateQuarter(); // Simulate the current quarter
            currentQuarter++;

            // Check if we have completed all 4 quarters
            if (currentQuarter > 4) {
                gameOver = true;
                if (scorePlayer > scoreOpponent) {
                    updateGameStatus("Player wins!");
                } else if (scoreOpponent > scorePlayer) {
                    updateGameStatus("Opponent wins!");
                } else {
                    updateGameStatus("It's a tie!");
                }
            } else {
                updateGameStatus(`Starting Quarter ${currentQuarter}`);
            }
        }
    } else {
        updateGameStatus("Game already over. Click reset to play again.");
    }
}

// Function to reset the game
function resetGame() {
    scorePlayer = 0;
    scoreOpponent = 0;
    currentQuarter = 1;
    gameOver = false;
    gameLog = [];
    updateGameStatus("Game reset. Click Start Game to begin!");
    renderGameLog();
}

// Add event listeners to the buttons
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('reset-button').addEventListener('click', resetGame);
