import Board from "./components/board/Board";
import Player from "./factories/player/Player";
import { useState } from "react";

let player1 = Player();
let player2 = Player(true); // PC opponent;
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

  const resetGame = () => {
    player1 = Player();
    player2 = Player(true);
    setGrid(player1.board.grid);
    setPcGrid(player2.board.grid);
    setBoardComplete(false);
    setShipsPlaced(false);
    setP1Shots(player1.attackList);
    setP2Shots(player2.attackList);
    setWinner(null);
  };

  const handleTurn = (e) => {
    if (player1.board.allSunk()) {
      setWinner("PC");
    }

    if (player2.board.allSunk()) {
      setWinner("You");
    }

    const targetCoord = e.target.id.split("").map((i) => parseInt(i));
    const isPcBoard =
      e.target.parentElement.attributes["data-is-pc"].value === "true";

    // Return if clicking on own board
    if (!isPcBoard) return;

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

  const winnerCard = () => {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: colors.text,
            letterSpacing: "1.3px",
            textShadow: "1px 1px 2px #222",
            fontSize: "2.5em",
            marginTop: "90px",
          }}
        >
          {winner}
          {winner === "PC" ? " wins!" : " win!"}
        </h1>
        <button
          onClick={resetGame}
          style={{
            padding: "10px",
            marginTop: "30px",
            width: "180px",
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "1.3px",
          }}
        >
          Play Again
        </button>
      </div>
    );
  };

  if (winner) {
    return winnerCard();
  } else if (boardComplete) {
    return (
      <div style={{ display: "flex", flexFlow: "row wrap" }}>
        {board()}
        {board(true)}
      </div>
    );
  } else {
    return board();
  }
}

export default App;
