import styled from "styled-components";
import { useState } from "react";
import Tile from "../tile/Tile";

const StyledBoard = styled.div`
  height: 400px;
  width: 400px;
  border: 2px solid #0004;
  display: grid;
  grid-template-columns: repeat(10, minmax(20px, 50px));
  grid-template-rows: repeat(10, minmax(20px, 50px));
`;

const Board = (props) => {
  const [grid, setGrid] = useState(createBoard());

  const modifyGrid = (x, y) => {
    let updatedGrid = grid;
    updatedGrid[x][y] = "X";

    setGrid(updatedGrid);
  };

  const placeShip = (e, direction = "vertical") => {
    const [x, y] = e.target.id.split("");
    const length = parseInt(e.dataTransfer.getData("length"));

    switch (direction) {
      case "horizontal":
        console.log({ x, y, length, direction });
        break;
      default:
        // defaults to vertical
        for (let i = 0; i < length; i++) {
          let tile = document.getElementById(`${x}${y - i}`);
          
          if (tile) {
            tile.style.background = "#222";
            modifyGrid(x, y - i);
          } else {
            let diff = length - i;
            tile = document.getElementById(`${x}${parseInt(y) + diff}`);
            tile.style.background = "#222";
            modifyGrid(x, parseInt(y) + diff);
          }
        }
        break;
    }
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
