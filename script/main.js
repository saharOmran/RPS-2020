

document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const result = document.getElementById('result');
    const startButton = document.getElementById('start');
    const result2 = document.getElementById('result2');
    const result3 = document.getElementById('result3');
    const restartButton = document.getElementById('restart');
    const scoreText = document.querySelector('.score');
    let playerScore = 0;
    let computerScore = 0;
    let rounds = 0;

    restartButton.style.display = 'none'; // Initially hidden

    // Initially disable the game choices
    choices.forEach(choice => {
        choice.disabled = true; // Disable choices initially
    });

    // Event listener for start button
    startButton.addEventListener('click', function() {
        // Enable the game choices
        choices.forEach(choice => {
            choice.disabled = false; // Enable choices
        });
        document.getElementById('choices').style.display = 'block';
        startButton.style.display = 'none';
    });

    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            scoreText.style.display = 'none';
            const playerChoice = this.value;
            const computerChoice = getComputerChoice();
            const winner = determineWinner(playerChoice, computerChoice);

            if (rounds < 3) { // Only update scores and display results if less than 3 rounds
                if (winner === "You win!") {
                    playerScore++;
                } else if (winner === "Computer wins!") {
                    computerScore++;
                }

                rounds++;

                if (rounds < 3) {
                    result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                    result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                } else {
                    // Display the restart button after the game ends
                    restartButton.style.display = 'block';
                    startButton.style.display = 'none';

                    if (playerScore > computerScore) {
                        result3.style.color = "green";
                        result3.textContent = `You win!`;
                        result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                        result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                    } else if (playerScore < computerScore) {
                        result3.style.color = "red";
                        result3.textContent = `You lost!`;
                        result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                        result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                    } else {
                        result3.style.color = "yellow";
                        result3.textContent = `draw!`;
                        result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                        result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                    }
                    // Prevent further clicks on choices after the game ends
                    choices.forEach(choice => {
                        choice.removeEventListener('click', choiceClickHandler);
                    });
                }
            }
        });
    });

    restartButton.addEventListener('click', function() {
        // Reset game state
        playerScore = 0;
        computerScore = 0;
        rounds = 0;
        result.textContent = '';
        result2.textContent = '';
        result3.textContent = '';
        scoreText.style.display = 'block';
        restartButton.style.display = 'none';
        startButton.style.display = 'block';
        choices.forEach(choice => {
            choice.disabled = true; // Disable choices initially
        });
    });

    function getComputerChoice() {
        const choicesArray = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choicesArray.length);
        return choicesArray[randomIndex];
    }

    function determineWinner(player, computer) {
        if (player === computer) {
            return "It's a tie!";
        } else if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return "You win!";
        } else {
            return "Computer wins!";
        }
    }
});




