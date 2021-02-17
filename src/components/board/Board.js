import { useState } from "react";
import Tile from "../tile/Tile";
import StyledBoard from "./StyledBoard";

const Board = (props) => {
  const [grid, setGrid] = useState(createBoard());

  const modifyGrid = (x, y, id) => {
    let updatedGrid = grid;
    updatedGrid[x][y] = id;

    setGrid(updatedGrid);
  };

  const placeShip = (e, direction = "vertical") => {
    const [x, y] = e.target.id.split("");
    const length = parseInt(e.dataTransfer.getData("length"));
    const shipId = parseInt(e.dataTransfer.getData("id"));

    switch (direction) {
      case "horizontal":
        for (let i = 0; i < length; i++) {
          let tile = document.getElementById(`${x - i}${y}`);
          
          if (tile) {
            tile.style.background = "#222";
            modifyGrid(x - i, y, shipId);
          } else {
            let diff = length - i;
            tile = document.getElementById(`${parseInt(x) + diff}${y}`);
            tile.style.background = "#222";
            modifyGrid(parseInt(x) + diff, y, shipId);
          }
        }
        break;
      default:
        // defaults to vertical
        for (let i = 0; i < length; i++) {
          let tile = document.getElementById(`${x}${y - i}`);
          
          if (tile) {
            tile.style.background = "#222";
            modifyGrid(x, y - i, shipId);
          } else {
            let diff = length - i;
            tile = document.getElementById(`${x}${parseInt(y) + diff}`);
            tile.style.background = "#222";
            modifyGrid(x, parseInt(y) + diff, shipId);
          }
        }
        break;
    }
  };

  const changeShipDirection = (e) => {
    
  };

  return (
    <StyledBoard>
      {grid.map((row, y) =>
        row.map((tile, x) => (
          <Tile
            tile={tile}
            id={`${x}${y}`}
            key={`${x}${y}`}
            grid={grid}
            setGrid={modifyGrid}
            onDrop={placeShip}
            onDoubleClick={changeShipDirection}
          />
        ))
      )}
    </StyledBoard>
  );
};

function createBoard() {
  let arr = [];

  for (let i = 0; i < 10; i++) {
    arr[i] = [[], [], [], [], [], [], [], [], [], []];
  }

  return arr;
}

export default Board;
