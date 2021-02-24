import { useState } from "react";
import StyledBoard from "./StyledBoard";
import Controls from "./subcomponents/Controls";

const Board = (props) => {
  const gameBoard = props.gameBoard;
  const colors = props.colors;
  const { boardComplete, setBoardComplete } = props.boardStatus;
  const { shipsPlaced, setShipsPlaced } = props.shipStatus;
  const [activeShip, setActiveShip] = useState(null);
  let { grid, setGrid } = props.gridState;
  let lastRemoved = null;

  if (props.isPC) {
    grid = props.gridState.pcGrid;
    setGrid = props.gridState.setPcGrid;
    console.log({ gridState: grid, gameBoard: gameBoard.grid });
  }

  const colorTiles = (coords, color) => {
    coords.forEach((coord) => {
      const id = coord.join("");
      const tile = document.getElementById(id);
      tile.style.backgroundColor = color;
    });
  };

  const placeShipObject = (ship) => {
    const newShip = gameBoard.placeShip(...ship.coords);
    colorTiles(newShip.coords, colors.backMain);
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

    const newShip = gameBoard.placeShip(...coords);
    if (newShip) {
      colorTiles(coords, colors.backMain);
    } else {
      return false;
    }

    setGrid(gameBoard.grid);
    setActiveShip(newShip);

    return true;
  };

  const changeShipDirection = (e) => {
    const coord = e.target.id.split("").map((i) => parseInt(i));
    const ship = gameBoard.getShipByCoord(coord);

    if (!ship) return false;

    const firstCoords = Object.assign([], ship.coords);
    colorTiles(firstCoords, colors.accent);
    if (gameBoard.rotateShip(ship)) {
      colorTiles(ship.coords, colors.backMain);
      setGrid(gameBoard.grid);
    } else {
      colorTiles(firstCoords, colors.backMain);
    }
  };

  const rotateShip = () => {
    if (!activeShip) return;

    const info = {
      target: {
        id: activeShip.coords[0].join(""),
      },
    };

    changeShipDirection(info);
  };

  const moveShip = (e) => {
    const startCoord = e.dataTransfer
      .getData("id")
      .split("")
      .map((i) => parseInt(i));

    // length of one indicates shipID, which means it was placed from
    // the 'dock' and not moved from another spot on the board
    if (startCoord.length === 1) return true;

    const removeID = e.dataTransfer
      .getData("removeShipAt")
      .split(",")
      .map((i) => parseInt(i));

    // Return if dragging a blank tile
    if (isNaN(removeID[0])) return false;
    const shipToRemove = gameBoard.getShipByCoord(removeID);
    const removeCoords = shipToRemove.coords;
    lastRemoved = shipToRemove;

    // Remove ship from ships array
    gameBoard.removeShipFromShips(shipToRemove);

    // Remove ship from grid
    removeCoords.forEach((coord) => {
      const [x, y] = coord;
      gameBoard.grid[x][y] = "";
    });

    // Change tile color back to empty color
    colorTiles(removeCoords, colors.accent);

    return true;
  };

  const handleDrop = (e) => {
    if (moveShip(e)) {
      if (!placeShip(e)) {
        placeShipObject(lastRemoved);
        lastRemoved = null;
      }
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

  const shuffle = () => {
    // Remove ship coloring
    gameBoard.grid.forEach((row, y) => {
      row.forEach((tile, x) => {
        colorTiles([[x, y]], colors.accent);
      });
    });

    // Place ships
    gameBoard.placeShipsRandomly();
    setShipsPlaced(true);
    setGrid(gameBoard.grid);

    // Add color to ships
    const ships = gameBoard.getShips();
    ships.forEach((ship) => {
      colorTiles(ship.coords, colors.backMain);
    });
  };

  const board = () => {
    const pc = props.isPC;

    return (
      <StyledBoard>
        {grid.map((row, x) =>
          row.map((tile, y) => (
            <div
              style={{
                background: pc
                  ? colors.accent
                  : tile
                  ? colors.backMain
                  : colors.accent,
                border: "1px solid #2223",
                borderRadius: "3px",
              }}
              id={`${x}${y}`}
              key={`${x}${y}`}
              onClick={(e) => console.log(e.target.id)}
              onDoubleClick={changeShipDirection}
              draggable={true}
              onDrop={handleDrop}
              onDragStart={handleDrag}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            />
          ))
        )}
      </StyledBoard>
    );
  };

  if (props.isPC) {
    return board();
  } else {
    return (
      <>
        <Controls
          rotateShip={rotateShip}
          shuffle={shuffle}
          shipStatus={shipsPlaced}
          boardStatus={{ boardComplete, setBoardComplete }}
        />
        {board()}
      </>
    );
  }
};

export default Board;
