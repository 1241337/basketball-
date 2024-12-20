// Game variables
let scorePlayer = 0;
let scoreOpponent = 0;
let playerFouls = 0;
let opponentFouls = 0;
let gamesPlayed = 0;
const totalSeasonGames = 5;
let currentQuarter = 1;
let gameOver = false;

// Player and opponent stats
const playerTeam = {
    "Player 1": { shooting: 7, passing: 6, defense: 5 },
    "Player 2": { shooting: 6, passing: 7, defense: 6 },
    "Player 3": { shooting: 8, passing: 5, defense: 6 }
};

const opponentTeam = {
    "Opponent 1": { shooting: 6, passing: 6, defense: 7 },
    "Opponent 2": { shooting: 7, passing: 6, defense: 6 },
    "Opponent 3": { shooting: 6, passing: 7, defense: 5 }
};

// Momentum multipliers
let momentumPlayer = 1.0;
let momentumOpponent = 1.0;

// DOM elements
const gameOutput = document.getElementById("game-output");
const startButton = document.getElementById("start-game-btn");
const resetButton = document.getElementById("reset-game-btn");

// Event listeners for buttons
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);

// Start the game
function startGame() {
    scorePlayer = 0;
    scoreOpponent = 0;
    gamesPlayed = 0;
    playerFouls = 0;
    opponentFouls = 0;
    currentQuarter = 1;
    gameOver = false;
    gameOutput.innerHTML = "Game Started! Quarter 1";
    simulateQuarter();
}

// Simulate a quarter of the game
function simulateQuarter() {
    console.log(`Simulating Quarter ${currentQuarter}...`);

    for (let i = 0; i < 5; i++) { // Each team gets 5 turns per quarter
        playerTurn();
        opponentTurn();
    }

    // Display current scores
    gameOutput.innerHTML = `
        Player: ${scorePlayer} | Opponent: ${scoreOpponent} <br>
        Quarter ${currentQuarter} complete!
    `;

    if (currentQuarter >= 4) {
        endGame();
    } else {
        currentQuarter++;
        setTimeout(simulateQuarter, 1000); // Simulate next quarter after a short delay
    }
}

// Player's turn
function playerTurn() {
    const player = randomPlayer(playerTeam);
    const action = randomAction();

    console.log(`${player} chooses action ${action}`);
    switch (action) {
        case 1: // 2-point shot
            if (shoot(player, 2)) {
                scorePlayer += 2;
                momentumShift("player");
                console.log(`${player} makes a 2-point shot!`);
            } else {
                console.log(`${player} misses the 2-point shot!`);
            }
            break;
        case 2: // 3-point shot
            if (shoot(player, 3)) {
                scorePlayer += 3;
                momentumShift("player");
                console.log(`${player} makes a 3-point shot!`);
            } else {
                console.log(`${player} misses the 3-point shot!`);
            }
            break;
        case 3: // Free throw
            if (freeThrow(player)) {
                scorePlayer += 1;
                momentumShift("player");
                console.log(`${player} makes a free throw!`);
            } else {
                console.log(`${player} misses the free throw!`);
            }
            break;
        case 4: // Pass ball
            passBall(playerTeam);
            break;
    }
}

// Opponent's turn
function opponentTurn() {
    const opponent = randomPlayer(opponentTeam);
    const action = randomAction();

    console.log(`${opponent} chooses action ${action}`);
    switch (action) {
        case 1: // 2-point shot
            if (shoot(opponent, 2)) {
                scoreOpponent += 2;
                momentumShift("opponent");
                console.log(`${opponent} makes a 2-point shot!`);
            } else {
                console.log(`${opponent} misses the 2-point shot!`);
            }
            break;
        case 2: // 3-point shot
            if (shoot(opponent, 3)) {
                scoreOpponent += 3;
                momentumShift("opponent");
                console.log(`${opponent} makes a 3-point shot!`);
            } else {
                console.log(`${opponent} misses the 3-point shot!`);
            }
            break;
        case 3: // Free throw
            if (freeThrow(opponent)) {
                scoreOpponent += 1;
                momentumShift("opponent");
                console.log(`${opponent} makes a free throw!`);
            } else {
                console.log(`${opponent} misses the free throw!`);
            }
            break;
        case 4: // Pass ball
            passBall(opponentTeam);
            break;
    }
}

// Random player from the team
function randomPlayer(team) {
    const players = Object.keys(team);
    return players[Math.floor(Math.random() * players.length)];
}

// Random action (1-4: shot, pass, etc.)
function randomAction() {
    return Math.floor(Math.random() * 4) + 1;
}

// Shooting function for 2-point or 3-point shots
function shoot(player, points) {
    const accuracy = points === 3 ? playerTeam[player].shooting - 1 : playerTeam[player].shooting;
    return Math.random() < accuracy / 10;
}

// Free throw function
function freeThrow(player) {
    const accuracy = playerTeam[player].shooting - 2;
    return Math.random() < accuracy / 10;
}

// Pass the ball to a new player
function passBall(team) {
    const players = Object.keys(team);
    const currentPlayer = randomPlayer(team);
    const newPlayer = players.filter(player => player !== currentPlayer)[Math.floor(Math.random() * (players.length - 1))];
    console.log(`${currentPlayer} passes the ball to ${newPlayer}.`);
}

// Momentum shift
function momentumShift(team) {
    if (team === "player") {
        momentumPlayer += 0.1;
        if (momentumPlayer > 1.5) {
            console.log("Player's team is on fire! Momentum is high.");
        }
    } else {
        momentumOpponent += 0.1;
        if (momentumOpponent > 1.5) {
            console.log("Opponent's team is heating up! Momentum is high.");
        }
    }
}

// End the game
function endGame() {
    gameOver = true;
    if (scorePlayer > scoreOpponent) {
        console.log(`Game over! Player wins!`);
    } else if (scoreOpponent > scorePlayer) {
        console.log(`Game over! Opponent wins!`);
    } else {
        console.log(`Game over! It's a tie!`);
    }
}

// Reset the game
function resetGame() {
    scorePlayer = 0;
    scoreOpponent = 0;
    gamesPlayed = 0;
    currentQuarter = 1;
    gameOver = false;
    console.log("Game Reset!");
    gameOutput.innerHTML = "Game Reset!";
}
