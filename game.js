// Game variables
let scorePlayer = 0;
let scoreOpponent = 0;
let playerFouls = { player1: 0, player2: 0, player3: 0 };
let opponentFouls = { opponent1: 0, opponent2: 0, opponent3: 0 };
let playerEnergy = { player1: 100, player2: 100, player3: 100 };
let opponentEnergy = { opponent1: 100, opponent2: 100, opponent3: 100 };
let currentQuarter = 1;
let gameOver = false;
let playerStats = {
  player1: { shooting: 8, passing: 7, defense: 6, points: 0 },
  player2: { shooting: 7, passing: 6, defense: 7, points: 0 },
  player3: { shooting: 9, passing: 8, defense: 5, points: 0 }
};
let opponentStats = {
  opponent1: { shooting: 7, passing: 6, defense: 8, points: 0 },
  opponent2: { shooting: 6, passing: 7, defense: 7, points: 0 },
  opponent3: { shooting: 8, passing: 5, defense: 6, points: 0 }
};
let benchPlayers = ['player4', 'player5', 'player6'];
let courtPlayers = ['player1', 'player2', 'player3'];

// Function to simulate shooting with fatigue
function shoot(player) {
  let energyFactor = playerEnergy[player] / 100; // Energy between 0 and 1
  let shootingAccuracy = playerStats[player].shooting * energyFactor; // Apply fatigue
  let chance = Math.random() * 10;
  return chance <= shootingAccuracy;
}

// Function to simulate free throw with fatigue
function freeThrow(player) {
  let energyFactor = playerEnergy[player] / 100;
  let shootingAccuracy = (playerStats[player].shooting - 2) * energyFactor;
  let chance = Math.random() * 10;
  return chance <= shootingAccuracy;
}

// Function to handle fouls and substitutions
function checkFoul(player) {
  if (player in playerFouls) {
    playerFouls[player]++;
    console.log(`${player} now has ${playerFouls[player]} fouls.`);
    if (playerFouls[player] >= 5) {
      console.log(`${player} has fouled out! Substituting.`);
      substitutePlayer(player, benchPlayers[0]); // Substituting with the first player on the bench
    }
  }
}

// Function to manage substitutions
function substitutePlayer(outPlayer, inPlayer) {
  let outIndex = courtPlayers.indexOf(outPlayer);
  if (outIndex !== -1) {
    courtPlayers[outIndex] = inPlayer;
    benchPlayers.push(outPlayer);
    benchPlayers.splice(benchPlayers.indexOf(inPlayer), 1);
    console.log(`${outPlayer} has been substituted for ${inPlayer}.`);
  }
}

// Function to decrease player energy after an action
function decreaseEnergy(player) {
  playerEnergy[player] -= 10;
  if (playerEnergy[player] < 0) playerEnergy[player] = 0;
  console.log(`${player}'s energy is now ${playerEnergy[player]}%.`);
}

// Function to simulate a shot (2-point or 3-point)
function takeShot(player) {
  let action = Math.random() > 0.5 ? "2-point" : "3-point";
  if (action === "2-point") {
    if (shoot(player)) {
      scorePlayer += 2;
      playerStats[player].points += 2;
      console.log(`${player} makes a 2-point shot!`);
    } else {
      console.log(`${player} misses the 2-point shot.`);
    }
  } else {
    if (shoot(player)) {
      scorePlayer += 3;
      playerStats[player].points += 3;
      console.log(`${player} makes a 3-point shot!`);
    } else {
      console.log(`${player} misses the 3-point shot.`);
    }
  }
}

// Function to simulate the whole quarter
function simulateQuarter() {
  for (let i = 0; i < 5; i++) {
    // Simulate Player's Turn
    let player = courtPlayers[Math.floor(Math.random() * courtPlayers.length)];
    console.log(`Player's action: ${player} takes a shot.`);
    takeShot(player);
    decreaseEnergy(player);

    // Check if player fouled
    if (Math.random() < 0.2) {
      checkFoul(player); // Random chance of a foul
    }

    // Simulate Opponent's Turn
    let opponent = `opponent${Math.floor(Math.random() * 3) + 1}`;
    console.log(`Opponent's action: ${opponent} takes a shot.`);
    if (shoot(opponent)) {
      scoreOpponent += 2;
      opponentStats[opponent].points += 2;
      console.log(`${opponent} makes a 2-point shot!`);
    } else {
      console.log(`${opponent} misses the 2-point shot.`);
    }

    // Decrease opponent energy
    decreaseEnergy(opponent);

    // Check if opponent fouled
    if (Math.random() < 0.2) {
      checkFoul(opponent); // Random chance of a foul
    }
  }
  console.log(`Quarter ${currentQuarter} complete!`);
  console.log(`Score - Player: ${scorePlayer}, Opponent: ${scoreOpponent}`);
}

// Function to start the game
function startGame() {
  console.log(`Game started! Quarter ${currentQuarter}`);
  simulateQuarter();
  currentQuarter++;

  // Check for game over condition
  if (currentQuarter > 4) {
    gameOver = true;
    if (scorePlayer > scoreOpponent) {
      console.log("Player wins!");
    } else if (scoreOpponent > scorePlayer) {
      console.log("Opponent wins!");
    } else {
      console.log("It's a tie!");
    }
  }
}

// Function to reset the game
function resetGame() {
  scorePlayer = 0;
  scoreOpponent = 0;
  currentQuarter = 1;
  playerFouls = { player1: 0, player2: 0, player3: 0 };
  opponentFouls = { opponent1: 0, opponent2: 0, opponent3: 0 };
  playerEnergy = { player1: 100, player2: 100, player3: 100 };
  opponentEnergy = { opponent1: 100, opponent2: 100, opponent3: 100 };
  benchPlayers = ['player4', 'player5', 'player6'];
  courtPlayers = ['player1', 'player2', 'player3'];
  console.log("Game has been reset.");
}

// Start the game
startGame();

// Optionally, reset the game by calling `resetGame()` when needed.
