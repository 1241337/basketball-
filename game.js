<script>
    let scorePlayer = 0;
    let scoreOpponent = 0;
    let currentQuarter = 1;
    let gameOver = false;
    let gameLog = [];

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

    function shoot(player) {
        let chance = Math.random();
        let shootingAccuracy = playerTeam[player] ? playerTeam[player].shooting : opponentTeam[player].shooting;
        return chance < shootingAccuracy / 10;
    }

    function passBall(team) {
        let players = team === 'player' ? Object.keys(playerTeam) : Object.keys(opponentTeam);
        let newHandler = players[Math.floor(Math.random() * players.length)];
        return newHandler;
    }

    function simulateQuarter() {
        if (gameOver) return;

        let playerAction = Math.floor(Math.random() * 4) + 1;
        let player = passBall('player');
        if (playerAction === 1) {
            if (shoot(player)) {
                scorePlayer += 2;
                updateGameStatus(`${player} scores a 2-point shot!`);
            } else {
                updateGameStatus(`${player} misses a 2-point shot.`);
            }
        } else if (playerAction === 2) {
            if (shoot(player)) {
                scorePlayer += 3;
                updateGameStatus(`${player} scores a 3-point shot!`);
            } else {
                updateGameStatus(`${player} misses a 3-point shot.`);
            }
        } else if (playerAction === 3) {
            let newHandler = passBall('player');
            updateGameStatus(`${player} passes the ball to ${newHandler}.`);
        }

        let opponentAction = Math.floor(Math.random() * 4) + 1;
        let opponent = passBall('opponent');
        if (opponentAction === 1) {
            if (shoot(opponent)) {
                scoreOpponent += 2;
                updateGameStatus(`${opponent} scores a 2-point shot!`);
            } else {
                updateGameStatus(`${opponent} misses a 2-point shot.`);
            }
        } else if (opponentAction === 2) {
            if (shoot(opponent)) {
                scoreOpponent += 3;
                updateGameStatus(`${opponent} scores a 3-point shot!`);
            } else {
                updateGameStatus(`${opponent} misses a 3-point shot.`);
            }
        } else if (opponentAction === 3) {
            let newHandler = passBall('opponent');
            updateGameStatus(`${opponent} passes the ball to ${newHandler}.`);
        }

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

    function startGame() {
        if (!gameOver) {
            if (currentQuarter <= 4) {
                updateGameStatus(`Quarter ${currentQuarter} in progress...`);
                simulateQuarter();
                currentQuarter++;

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

    function advanceQuarter() {
        if (gameOver) {
            updateGameStatus("Game already over. Click reset to play again.");
            return;
        }

        if (currentQuarter <= 4) {
            updateGameStatus(`Advancing to Quarter ${currentQuarter}...`);
            simulateQuarter();
            currentQuarter++;

            if (currentQuarter > 4) {
                gameOver = true;
                if (scorePlayer > scoreOpponent) {
                    updateGameStatus("Game over! Player wins!");
                } else if (scoreOpponent > scorePlayer) {
                    updateGameStatus("Game over! Opponent wins!");
                } else {
                    updateGameStatus("Game over! It's a tie!");
                }
            } else {
                updateGameStatus(`Starting Quarter ${currentQuarter}`);
            }
        }
    }

    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('advance-button').addEventListener('click', advanceQuarter);
    document.getElementById('reset-button').addEventListener('click', resetGame);
</script>
