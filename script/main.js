
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

    restartButton.style.display = 'none';
     
    // Event listener for start button
    startButton.addEventListener('click', function() {
        // Show the choices and hide the start button
        
        document.getElementById('choices').style.display = 'block';
        startButton.style.display = 'none';
    });

    

    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            scoreText.style.display = 'none';
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
            }else  {
                if (playerScore > computerScore) {
                    result3.style.color = "green";
                    result3.textContent = `You win!` ;
                    result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                    result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                    return result3.textContent;

                } else if (playerScore < computerScore) {
                    result3.style.color = "red";
                    result3.textContent = `You lost!`;
                    result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                    result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                    return result3.textContent;
                } else {
                    result3.style.color = "white";
                    result3.textContent = `draw`;
                    result2.textContent = `you  ${playerScore} : ${computerScore}  AI`;
                    result.textContent = `Round ${rounds}: Computer chose ${computerChoice}. ${winner}`;
                    return result3.textContent;
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
        scoreText.style.display = 'block';
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