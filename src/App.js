import Board from "./components/board/Board";
import Ship from "./components/ship/Ship";
import styled from "styled-components";
import Player from "./factories/player/Player";
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
  const colors = {
    backMain: "#222831",
    backAccent: "#393E46",
    text: "#EEE",
    accent: "#00ADB5",
  };

  const board = (isPC = false) => {
    return (
      <Board
        gameBoard={isPC ? player2.board : player1.board}
        gridState={isPC ? { pcGrid, setPcGrid } : { grid, setGrid }}
        isPC={isPC}
        colors={colors}
        boardStatus={{ boardComplete, setBoardComplete }}
        shipStatus={{ shipsPlaced, setShipsPlaced }}
      />
    );
  };

  if (boardComplete) {
    return (
      <>
        <div style={{ display: "flex", flexFlow: "row wrap" }}>
          {board()}
          {board(true)}
        </div>
      </>
    );
  } else {
    return board();
  }
}

export default App;
