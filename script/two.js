 
document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const result = document.getElementById('result');
    const startButton = document.getElementById('start');
    const result2 = document.getElementById('result2');
    const result3 = document.getElementById('result3');
    const restartButton = document.getElementById('restart');
    const scoreText = document.querySelector('.score');
    let playerOneChoice = '';
    let playerTwoChoice = '';
    let playerScore = 0;
    let computerScore = 0;
    let rounds = 0;
    let currentPlayer = 1;

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

    function choiceClickHandler() {
        scoreText.style.display = 'none';
        if (currentPlayer === 1) {
            playerOneChoice = this.value;
            currentPlayer = 2;
            result2.textContent = "Player 2's turn";
        } else {
            playerTwoChoice = this.value;
            currentPlayer = 1;
    
            const winner = determineWinner(playerOneChoice, playerTwoChoice);
    
            if (winner === "Player1 wins!") {
                playerScore++;
            } else if (winner === "Player2 wins!") {
                computerScore++;
            }
    
            rounds++;
    
            result.textContent = `Round ${rounds}: Player 1 chose ${playerOneChoice}, Player 2 chose ${playerTwoChoice}. ${winner}`;
            result2.textContent = `Player 1: ${playerScore}  Player 2: ${computerScore}`;
    
            if (rounds === 3) {
                if (playerScore > computerScore) {
                    result3.style.color = "green";
                    result3.textContent = "Player 1 wins the game!";
                } else if (playerScore < computerScore) {
                    result3.style.color = "red";
                    result3.textContent = "Player 2 wins the game!";
                } else {
                    result3.style.color = "yellow";
                    result3.textContent = "It's a tie!";
                }
    
                // Display the restart button after the game ends
                restartButton.style.display = 'block';
                startButton.style.display = 'none';
    
                // Prevent further clicks on choices after the game ends
                choices.forEach(choice => {
                    choice.removeEventListener('click', choiceClickHandler);
                });
            }
        }
    }

    choices.forEach(choice => {
        choice.addEventListener('click', choiceClickHandler);
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
 

function determineWinner(playerOneChoice, playerTwoChoice) {
    if (playerOneChoice === playerTwoChoice) {
        return "It's a tie!";
    } else if (
        (playerOneChoice === 'rock' && playerTwoChoice === 'scissors') ||
        (playerOneChoice === 'paper' && playerTwoChoice === 'rock') ||
        (playerOneChoice === 'scissors' && playerTwoChoice === 'paper')
    ) {
        return "Player1 wins!";
    } else {
        return "Player2 wins!";
    }
}