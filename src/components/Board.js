import styled from "styled-components";
import { useState } from "react";
import Tile from "./Tile";

const StyledBoard = styled.div``;

const Board = (props) => {
  const [grid, setGrid] = useState(createBoard());

  console.log(grid);

  return <StyledBoard>Hello</StyledBoard>;
};

function createBoard() {
  let arr = [];

  for (let i = 0; i < 10; i++) {
    arr[i] = [[], [], [], [], [], [], [], [], [], []];
  }

  return arr;
}

export default Board;
