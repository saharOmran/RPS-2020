
document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const result = document.getElementById('result');
 
    const result2 = document.getElementById('result2');
    const result3 = document.getElementById('result3');
    const restartButton = document.getElementById('restart');
    let playerScore = 0;
    let computerScore = 0;
    let rounds = 0;

    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            const playerChoice = this.value;
            const computerChoice = getComputerChoice();
            const winner = determineWinner(playerChoice, computerChoice);
           

            if (winner === "You win!") {
                playerScore++;
            } else if (winner === "Computer wins!") {
                computerScore++;
            }

            rounds++;

            if (rounds < 3) {
                result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                result2.textContent = `you  ${playerScore} : ${computerScore}  AI`
            } else {
                if (playerScore > computerScore) {
                    result3.style.color = "green";
                    result3.textContent = `You win!` ;
                    result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                    result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;

                } else if (playerScore < computerScore) {
                    result3.style.color = "red";
                    result3.textContent = `You lost!`;
                    result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                    result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                } else {
                    result3.style.color = "white";
                    result3.textContent = `draw`;
                    result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                    result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;

                }
                restartButton.style.display = 'block';
            }
        });
    });

    restartButton.addEventListener('click', function() {
        playerScore = 0;
        computerScore = 0;
        rounds = 0;
        result.textContent = '';
        restartButton.style.display = 'none';
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