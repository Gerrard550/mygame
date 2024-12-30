"use strict";

/*
GAME RULES: - See Pen Description
*/

//Initialise Variable
let scores,
  roundScore,
  activePlayer,
  gamePlaying,
  rolls,
  failMsg,
  msgSix,
  msgOne,
  msgDom;

init();

//Set up eventhandler for Roll Dice Button - with annonymous fnction
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    //2.1 Display the dice
    let diceDom = document.querySelector(".dice");
    diceDom.style.display = "block";
    diceDom.src = "dice-" + dice + ".png";

    //Display rolls
    document.querySelector("#previous-" + activePlayer).textContent = rolls;

    if (dice === 6 && rolls === 6) {
      //Player has rolled 2 x 6 in a row

      //1.Player loses entire score
      scores[activePlayer] = 0;

      //2. Update dom
      document.getElementById("score-" + activePlayer).textContent =
        scores[activePlayer];

      //3. Display the reason it is next player
      msgSix = "You rolled SIX twice in a row!";
      doFailMsg(msgSix);

      //4. Next Player
      nextPlayer();
    } else if (dice !== 1) {
      //Add score
      roundScore += dice;

      //Update current score
      document.querySelector("#current-" + activePlayer).textContent =
        roundScore;
    } else {
      //dice is 1

      msgOne = "You rolled a ONE!";
      doFailMsg(msgOne);
      nextPlayer();
    }

    rolls = dice;
  }
});

//EVENT LISTENER FOR HOLD BUTTON
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= 100) {
      //Winner
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";

      //Hide Dice
      document.querySelector(".dice").style.display = "none";

      //Apply Winner class to player panel
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  //Set roundScore back to ZERO
  roundScore = 0;

  //Set rolls to 0
  rolls = 0;

  //Set current scores back to ZERO
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Change Active Player Panel
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //Hide the dice
  document.querySelector(".dice").style.display = "none";

  //Remove Error mesage from Active Player if there is one.
  document.querySelector("#msgCurrent-" + activePlayer).textContent = "";
}

//EVENT LISTENER FOR NEW GAME BTN
document.querySelector(".btn-new").addEventListener("click", init);

//INITIALISATION FUNCTION
function init() {
  scores = [0, 0];
  roundScore = 0;
  //Active player - keeps track of which player is playing
  activePlayer = 0;
  gamePlaying = true;

  //Rolls holds the previous and current dice roll numbers
  rolls = 0;

  //Initialise scores to ZERO
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("previous-0").textContent = "0";
  document.getElementById("previous-1").textContent = "0";

  //Hide the dice at first
  document.querySelector(".dice").style.display = "none";

  //Set Player 1 and Player 2 Titles
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  //Remove winner and active panel classes
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  //Set player 1 to active player at start of game
  document.querySelector(".player-0-panel").classList.add("active");

  //Set Error messages to empty string
  document.querySelector("#msgCurrent-0").textContent = "";
  document.querySelector("#msgCurrent-1").textContent = "";
}

//FAIL MESSAGE
function doFailMsg(msg) {
  //1. Get element for message
  msgDom = document.getElementById("msgCurrent-" + activePlayer);

  //2. Update DOM
  msgDom.innerHTML = msg;
}
