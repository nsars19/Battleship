import styled from "styled-components";
import { useState } from "react";
import Tile from "./Tile";

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

  return (
    <StyledBoard>
      {grid.map((row, i) => 
        row.map((tile, y) => 
          <Tile tile={tile} id={`${i}${y}`} key={`${i}${y}`} />))}
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
