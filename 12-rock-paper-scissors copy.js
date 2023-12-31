let score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0,
};
let intervalId;
let isAutoplaying = false;
updateScoreElement();
function autoplay()
{
  if(!isAutoplaying){
    intervalId = setInterval(function()
    {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000
  )
    isAutoplaying = true;
  }
  else {
    clearInterval(intervalId);
    isAutoplaying = true;

  }
};
document.querySelector('.js-rock-button').addEventListener('click',()=>{
  playGame('rock');
})
document.querySelector('.js-paper-button').addEventListener('click',()=>{
  playGame('paper');
})
document.querySelector('.js-scissors-button').addEventListener('click',()=>{
  playGame('scissors');
})

document.body.addEventListener('keydown',(event)=>{
  if(event.key==='r'){
    playGame('rock');
  }
  else if(event.key==='p'){
    playGame('paper');
  }
  else if(event.key==='s'){
    playGame('scissors');
  }
})

function playGame(playerMove)
{
const computerMove = pickComputerMove();
let result='';
if(playerMove==='scissors'){

if(computerMove=== 'rock'){
  result='You lose.';
}
else if(computerMove=== 'paper'){
  result='You win.';
}
else if(computerMove=== 'scissors')
{
  result='Tie.';
}
}

else if(playerMove==='paper'){

if(computerMove=== 'rock'){
  result='You win.';
}
else if(computerMove=== 'paper'){
  result='Tie.';
}
else if(computerMove=== 'scissors')
{
  result='You lose.';
}

}


else if(playerMove==='rock'){

if(computerMove=== 'rock'){
result='Tie.';
}
else if(computerMove=== 'paper'){
result='You lose.';
}
else if(computerMove=== 'scissors')
{
result='You win.';
}

}
if(result==='You win.'){
score.wins++;
}
else if(result==='You lose.'){
score.losses++;
}
else if(result==='Tie.'){
score.ties++;
}

localStorage.setItem('score',JSON.stringify(score));
updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You
<img  class="move-icon" src="pictures/${playerMove}-emoji.png">
<img class="move-icon" src="pictures/${computerMove}-emoji.png">
Computer`;
}


function updateScoreElement() {
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}.
`;}

function pickComputerMove()
{

let computerMove='';
const randomNumber = Math.random();

if(randomNumber>=0 && randomNumber < 1/3){
computerMove ='rock';
}

else if(randomNumber >=1/3 && randomNumber < 2/3){
computerMove = 'paper';
}

else if(randomNumber >=2/3 && randomNumber<1) {
computerMove = 'scissors';
}
return computerMove;

}