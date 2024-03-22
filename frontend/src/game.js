const tiles = document.querySelectorAll(".tile");
const PLAYER_1 = "O";
const PLAYER_2 = "X";
let turn = PLAYER_1;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function x(data){
    populateBoard(data.game.board);
    mySymbol = data.player1 === login ? PLAYER_1 : PLAYER_2;
    setHoverText(mySymbol);

    showPlayers(data);
    
    showResult(data);
    console.log(data.game.result);
}

function populateBoard(board) {
    tiles.forEach((tile) => {
        let tileNumber = tile.dataset.index;
        if(board[tileNumber] === PLAYER_1) {
            tile.innerText = PLAYER_1
        } else if (board[tileNumber] === PLAYER_2) {
            tile.innerText = PLAYER_2
        }
    })
}

function showPlayers(data){
  player1_login = data.player1;
  player2_login = data.player2;

  enemy_login =  player1_login === login ? player2_login : player1_login;
  mySymbol = player1_login === login ? PLAYER_1 : PLAYER_2;
  enemySymbol = player1_login === login ? PLAYER_2 : PLAYER_1;

  document.getElementById("my-login").textContent = login;
  document.getElementById("enemy-login").textContent = enemy_login;

  if (data.game.turn === mySymbol){
    document.getElementById("my-player-nick").style.border = "2px solid red";
    document.getElementById("enemy-player-nick").style.border = "";
  } else {
    document.getElementById("my-player-nick").style.border = "";
    document.getElementById("enemy-player-nick").style.border = "2px solid red";
  }
}

function showResult(data) {
  if (data.game.result != ""){
    if (data.game.result === "draw"){
      document.getElementById("game-result").textContent = data.game.result;
    } else {
      document.getElementById("game-result").textContent = data.game.result + " wins!";
    }
  }
}

function setHoverText(symbol) {
  //remove all hover text
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClass = `${symbol.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText == "") {
      tile.classList.add(hoverClass);
    }
  });
}

function tileClick(event) {
  if (document.getElementById("game-result").textContent != "") {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }

  move(tileNumber)

  // if (turn === PLAYER_2) {
  //   tile.innerText = PLAYER_2;
  //   boardState[tileNumber - 1] = PLAYER_2;
  //   turn = PLAYER_1;
  // } else {
  //   tile.innerText = PLAYER_1;
  //   boardState[tileNumber - 1] = PLAYER_1;
  //   turn = PLAYER_2;
  // }

  //setHoverText();
  //checkWinner();
}

// function checkWinner() {
//   //Check for a winner
//   for (const winningCombination of winningCombinations) {
//     //Object Destructuring
//     const { combo, strikeClass } = winningCombination;
//     const tileValue1 = boardState[combo[0] - 1];
//     const tileValue2 = boardState[combo[1] - 1];
//     const tileValue3 = boardState[combo[2] - 1];

//     if (
//       tileValue1 != null &&
//       tileValue1 === tileValue2 &&
//       tileValue1 === tileValue3
//     ) {
//       strike.classList.add(strikeClass);
//       gameOverScreen(tileValue1);
//       return;
//     }
//   }

//   //Check for a draw
//   const allTileFilledIn = boardState.every((tile) => tile !== null);
//   if (allTileFilledIn) {
//     gameOverScreen(null);
//   }
// }

// function gameOverScreen(winnerText) {
//   let text = "Draw!";
//   if (winnerText != null) {
//     text = `Winner is ${winnerText}!`;
//   }
//   gameOverArea.className = "visible";
//   gameOverText.innerText = text;
// }

// function startNewGame() {
//   strike.className = "strike";
//   gameOverArea.className = "hidden";
//   boardState.fill(null);
//   tiles.forEach((tile) => (tile.innerText = ""));
//   turn = PLAYER_2;
//   setHoverText();
// }

// TODO zmienic numerek 1 w dol
// const winningCombinations = [
//   //rows
//   { combo: [1, 2, 3], strikeClass: "strike-row-1" },
//   { combo: [4, 5, 6], strikeClass: "strike-row-2" },
//   { combo: [7, 8, 9], strikeClass: "strike-row-3" },
//   //columns
//   { combo: [1, 4, 7], strikeClass: "strike-column-1" },
//   { combo: [2, 5, 8], strikeClass: "strike-column-2" },
//   { combo: [3, 6, 9], strikeClass: "strike-column-3" },
//   //diagonals
//   { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
//   { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
// ];