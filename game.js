let currentQuarter = 1;
let scorePlayer = 0;
let scoreOpponent = 0;
let gameOver = false;
let seasonWinsPlayer = 0;
let seasonWinsOpponent = 0;
let playerTeam = ['Player 1', 'Player 2', 'Player 3']; // Example player names
let opponentTeam = ['Opponent 1', 'Opponent 2', 'Opponent 3']; // Example opponent names

// Function to update the game status
function updateGameStatus(message) {
    document.getElementById('game-status').innerHTML += `<p>${message}</p>`;
}

// Function to update the scoreboard
function updateScoreboard() {
    document.getElementById('player-score').textContent = scorePlayer;
    document.getElementById('opponent-score').textContent = scoreOpponent;
}

// Function to simulate a 2-point shot
function shoot(player) {
    let shotChance = Math.random();
    if (player === "player") {
        return shotChance < 0.5; // 50% chance for player to make the shot
    } else {
        return shotChance < 0.45; // 45% chance for opponent to make the shot
    }
}

// Function to simulate a pass
function passBall(team) {
    let players = team === 'player' ? playerTeam : opponentTeam;
    let randomIndex = Math.floor(Math.random() * players.length);
    return players[randomIndex];
}

// Function to simulate a quarter
function simulateQuarter() {
    if (gameOver) return;

    // Track points for each team
    let playerPoints = 0;
    let opponentPoints = 0;

    // Player team attempts (20 shots)
    for (let i = 0; i < 20; i++) {
        let player = passBall('player');
        let playerAction = Math.floor(Math.random() * 4) + 1; // Random action for player

        if (playerAction === 1) {  // 2-point shot attempt
            if (shoot(player)) {
                playerPoints += 2;
                updateGameStatus(`${player} scores a 2-point shot!`);
            } else {
                updateGameStatus(`${player} misses a 2-point shot.`);
            }
        } else if (playerAction === 2) {  // 3-point shot attempt
            if (shoot(player)) {
                playerPoints += 3;
                updateGameStatus(`${player} scores a 3-point shot!`);
            } else {
                updateGameStatus(`${player} misses a 3-point shot.`);
            }
        } else if (playerAction === 3) {  // Pass ball
            let newHandler = passBall('player');
            updateGameStatus(`${player} passes the ball to ${newHandler}.`);
        }
    }

    // Opponent team attempts (20 shots)
    for (let i = 0; i < 20; i++) {
        let opponent = passBall('opponent');
        let opponentAction = Math.floor(Math.random() * 4) + 1; // Random action for opponent

        if (opponentAction === 1) {  // 2-point shot attempt
            if (shoot(opponent)) {
                opponentPoints += 2;
                updateGameStatus(`${opponent} scores a 2-point shot!`);
            } else {
                updateGameStatus(`${opponent} misses a 2-point shot.`);
            }
        } else if (opponentAction === 2) {  // 3-point shot attempt
            if (shoot(opponent)) {
                opponentPoints += 3;
                updateGameStatus(`${opponent} scores a 3-point shot!`);
            } else {
                updateGameStatus(`${opponent} misses a 3-point shot.`);
            }
        } else if (opponentAction === 3) {  // Pass ball
            let newHandler = passBall('opponent');
            updateGameStatus(`${opponent} passes the ball to ${newHandler}.`);
        }
    }

    // After 20 shots each, update the game state for the quarter
    scorePlayer += playerPoints;
    scoreOpponent += opponentPoints;

    updateGameStatus(`Quarter ${currentQuarter} complete: Player scored ${playerPoints} points, Opponent scored ${opponentPoints} points.`);
    updateScoreboard();

    // Move to the next quarter or end the game if it's the last quarter
    if (currentQuarter < 4) {
        currentQuarter++;
        updateGameStatus(`Starting Quarter ${currentQuarter}...`);
    } else {
        gameOver = true;
        if (scorePlayer > scoreOpponent) {
            updateGameStatus("Game over! Player wins!");
            seasonWinsPlayer++;
        } else if (scoreOpponent > scorePlayer) {
            updateGameStatus("Game over! Opponent wins!");
            seasonWinsOpponent++;
        } else {
            updateGameStatus("Game over! It's a tie!");
        }

        // Show final scores for both teams at the end of the game
        updateGameStatus(`Final Score: Player: ${scorePlayer} | Opponent: ${scoreOpponent}`);
    }
}

// Function to start the game
function startGame() {
    gameOver = false;
    currentQuarter = 1;
    scorePlayer = 0;
    scoreOpponent = 0;
    updateGameStatus("Game started! Quarter 1");
    updateScoreboard();

    // Simulate the first quarter
    simulateQuarter();
}

// Function to reset the game
function resetGame() {
    gameOver = false;
    currentQuarter = 1;
    scorePlayer = 0;
    scoreOpponent = 0;
    updateGameStatus("Game reset! Quarter 1");
    document.getElementById('game-status').innerHTML = ''; // Clear previous game info
    updateScoreboard(); // Reset the scoreboard
}

// Event listeners for buttons
document.getElementById('start-game-btn').addEventListener('click', function() {
    if (!gameOver) {
        simulateQuarter();
    } else {
        startGame(); // Restart the game if it's over
    }
});

document.getElementById('reset-game-btn').addEventListener('click', function() {
    resetGame(); // Reset the game
});
