import { useState } from "react";
import Tile from "../tile/Tile";
import StyledBoard from "./StyledBoard";

const Board = ({ gameBoard }) => {
  const [grid, setGrid] = useState(gameBoard.grid);
  const [activeShip, setActiveShip] = useState(null);

  const modifyGrid = (x, y, id) => {
    let updatedGrid = grid;
    updatedGrid[x][y] = id;
    setGrid(updatedGrid);
  };

  const colorTiles = (coords, color) => {
    coords.forEach((coord) => {
      const id = coord.join("");
      const tile = document.getElementById(id);
      tile.style.backgroundColor = color;
    });
  };

  const placeShip = (e) => {
    const [x, y] = e.target.id.split("").map((i) => parseInt(i));
    const length = e.dataTransfer.getData("length");
    const coords = [];

    let offset = 0;
    for (let i = 0; i < length; i++) {
      if (y + i > 9) {
        offset += 1;
        coords.push([x, y - offset]);
      } else {
        coords.push([x, y + i]);
      }
    }

    const ship = gameBoard.placeShip(...coords);
    if (ship) {
      colorTiles(coords, "#222");
    }

    setGrid(gameBoard.grid);
    setActiveShip(ship);
  };

  const changeShipDirection = (e) => {
    const coord = e.target.id.split("").map((i) => parseInt(i));
    const ship = gameBoard.getShipByCoord(coord);

    if (!ship) return false;

    const firstCoords = Object.assign([], ship.coords);
    colorTiles(firstCoords, "#78f");
    if (gameBoard.rotateShip(ship)) {
      colorTiles(ship.coords, "#222");
      setGrid(gameBoard.grid);
    } else {
      colorTiles(firstCoords, "#222");
    }
  };

  const moveShip = (e) => {
    const coord = e.dataTransfer
      .getData("id")
      .split("")
      .map((i) => parseInt(i));

    // length of one indicates shipID, which means it was placed from
    // the 'dock' and not moved from another spot on the board
    if (coord.length === 1) return true;

    const removeID = e.dataTransfer
      .getData("removeShipAt")
      .split(",")
      .map((i) => parseInt(i));

    // Return if dragging a blank tile
    if (isNaN(removeID[0])) return false;
    const shipToRemove = gameBoard.getShipByCoord(removeID);
    const removeCoords = shipToRemove.coords;

    // Remove ship from ships array
    gameBoard.removeShipFromShips(shipToRemove);

    // Remove ship from grid
    removeCoords.forEach((coord) => {
      const [x, y] = coord;
      gameBoard.grid[x][y] = "";
    });

    // Change tile color back to empty color
    colorTiles(removeCoords, "#78f");

    return true;
  };

  const handleDrop = (e) => {
    if (moveShip(e)) {
      placeShip(e);
    }
  };

  const handleDrag = (e) => {
    const id = e.target.id.split("").map((i) => parseInt(i));
    if (!gameBoard.getShipByCoord(id)) return;
    const ship = gameBoard.getShipByCoord(id);
    const length = ship.coords.length;
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("id", e.target.id);
    e.dataTransfer.setData("length", length);
    e.dataTransfer.setData("removeShipAt", id);
  };

  return (
    <StyledBoard>
      {grid.map((row, y) =>
        row.map((tile, x) => (
          <Tile
            id={`${x}${y}`}
            key={`${x}${y}`}
            grid={grid}
            setGrid={modifyGrid}
            onDrop={handleDrop}
            onDoubleClick={changeShipDirection}
            getShip={gameBoard.getShipByCoord}
            handleDrag={handleDrag}
          />
        ))
      )}
    </StyledBoard>
  );
};

function createBoard() {
  let arr = [];

  for (let i = 0; i < 10; i++) {
    arr[i] = ["", "", "", "", "", "", "", "", "", ""];
  }

  return arr;
}

export default Board;
