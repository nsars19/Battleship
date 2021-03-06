import Board from "./components/board/Board";
import Player from "./factories/player/Player";
import Winner from "./components/winner/Winner";
import { useState } from "react";

const player1 = Player();
const player2 = Player(true); // PC opponent;
// Set PC players board
player2.board.placeShipsRandomly();

function App() {
  const [grid, setGrid] = useState(player1.board.grid);
  const [pcGrid, setPcGrid] = useState(player2.board.grid);
  const [boardComplete, setBoardComplete] = useState(false);
  const [shipsPlaced, setShipsPlaced] = useState(false);
  const [p1Shots, setP1Shots] = useState(player1.attackList);
  const [p2Shots, setP2Shots] = useState(player2.attackList);
  const [winner, setWinner] = useState(null);

  const colors = {
    backMain: "#222831",
    backAccent: "#393E46",
    text: "#EEE",
    accent: "#00ADB5",
    hit: "#803434",
    miss: "#8a8a8a",
  };

  const clearState = () => {
    setWinner(null);
    setGrid(player1.board.grid);
    setPcGrid(player2.board.grid);
    setBoardComplete(false);
    setShipsPlaced(false);
    setP1Shots(player1.attackList);
    setP2Shots(player2.attackList);
  };

  const resetGame = () => {
    player1.reset();
    player2.reset();
    player2.board.placeShipsRandomly();
    clearState();
  };

  const handleTurn = (e) => {
    const targetCoord = e.target.id.split("").map((i) => parseInt(i));
    const isPcBoard =
      e.target.parentElement.attributes["data-is-pc"].value === "true";

    // Return if clicking on own board
    if (!isPcBoard) return;

    // Check if game is over
    if (player1.board.allSunk()) {
      setWinner("PC");
      return;
    }

    if (player2.board.allSunk()) {
      setWinner("You");
      return;
    }

    // Return if clicking on previously chosen tile
    if (!player1.attack(targetCoord, player2.board)) return;
    setP1Shots([...p1Shots, player1.attackList[player1.attackList.length - 1]]);

    player2.attack(null, player1.board);
    setP2Shots([...p2Shots, player2.attackList[player2.attackList.length - 1]]);
  };

  const board = (isPC = false) => {
    return (
      <Board
        gameBoard={isPC ? player2.board : player1.board}
        gridState={isPC ? { pcGrid, setPcGrid } : { grid, setGrid }}
        isPC={isPC}
        shots={isPC ? p1Shots : p2Shots}
        colors={colors}
        boardStatus={{ boardComplete, setBoardComplete }}
        shipStatus={{ shipsPlaced, setShipsPlaced }}
        handleTurn={handleTurn}
        winner={winner}
      />
    );
  };

  // Render winner if there is a winner, else render both boards if the player has
  // set their board, else render just the player's board
  return (
    <>
      {(winner && <Winner winner={winner} resetGame={resetGame} />) ||
        (boardComplete && (
          <div style={{ display: "flex", flexFlow: "row wrap" }}>
            {board()}
            {board(true)}
          </div>
        )) ||
        board()}
    </>
  );
}

export default App;
