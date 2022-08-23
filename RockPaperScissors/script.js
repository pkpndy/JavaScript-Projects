
const finalScores = {computerScore: 0, playerScore: 0}

function getComputerChoice() {
    const choices=['Rock', 'Paper', 'Scissors'];

    let genNum = Math.floor(Math.random() * 3); 
    
    return choices[genNum];
}

function getResult(playerChoice, computerChoice) {
  
  let score;
  if(playerChoice==computerChoice){
    score=0;
  }else if(playerChoice=='Rock' && computerChoice=='Scissors'){
    score=1;
  }else if(playerChoice=='Paper' && computerChoice=='Rock'){
    score=1;
  }else if(playerChoice=='Scissors' && computerChoice=='Paper'){
    score=1;
  }else{
    score=-1;
  }


  return score;
  
  
}

function showResult(score, playerChoice, computerChoice) {
  
  let resultDiv=document.getElementById("result");

  let handsDiv=document.getElementById('hands');
  let playerScoreDiv=document.getElementById('player-score');

  if(score==-1){
    resultDiv.innerText= 'You Lose!';
  }else if(score==0){
    resultDiv.innerText='It is a draw!';
  }else{
    resultDiv.innerText="You win!";
  }
  finalScores['playerScore'] += score;
  playerScoreDiv.innerText='Final Score: '+finalScores['playerScore'];

  handsDiv.innerText='Player choice: '+playerChoice+' & Computer Choice: '+computerChoice;
 

}


function onClickRPS(playerChoice) {
    let computerChoice=getComputerChoice();
    

    let result=getResult(playerChoice, computerChoice);

    showResult(result,playerChoice,computerChoice);

}

function playGame() {
  let btnSelected = document.querySelectorAll('.rpsButton');

    btnSelected.forEach(rpsButton => {
        rpsButton.onclick = () => onClickRPS(rpsButton.value)
    })
 
    let exit=document.getElementById('endGameButton');

    exit.onclick =() => endGame(finalScores);

  
}

function endGame(finalScores) {
    let playerScoreDiv=document.getElementById('player-score');
    let handsDiv=document.getElementById('hands');
    let resultDiv=document.getElementById("result");

    playerScoreDiv.innerText='';
    handsDiv.innerText='';
    resultDiv.innerText='';

    finalScores['playerScore']=0
    finalScores['computerScore']=0
    
}

playGame()