import ShipFactory from "./../ship/Ship";

const GameBoard = () => {
  const grid = buildGrid();
  const misses = [];
  const ships = [];

  function buildGrid() {
    let grid = [];
    for (let i = 0; i < 10; i++) {
      grid[i] = ["", "", "", "", "", "", "", "", "", ""];
    }
    return grid;
  }

  const clearGrid = () => {
    grid.forEach((row, y) => {
      row.forEach((_, x) => {
        grid[x][y] = "";
      });
    });
  };

  const setTile = ([x, y], ship) => {
    if (!grid[x][y]) grid[x][y] = ship;
  };

  const spotsTaken = (coords) => {
    let isTaken = false;
    for (let coord of coords) {
      const [x, y] = coord;
      if (grid[x][y]) {
        isTaken = true;
        break;
      }
    }

    return isTaken;
  };

  const getShipByCoord = (coord) => {
    const [x, y] = coord;
    const ship = grid[x][y];

    if (!ship) return false;

    return ship;
  };

  const placeShip = (...coords) => {
    const ship = ShipFactory(coords);

    // Prevent overlap
    if (spotsTaken(coords)) return false;

    ships.push(ship);

    for (let coord of coords) {
      setTile(coord, ship);
    }

    return ship;
  };
  const removeShipFromShips = (ship) => {
    const idx = ships.indexOf(ship);

    if (idx !== -1) {
      ships.splice(idx, 1);
      return true;
    }

    return false;
  };

  const removeShipFromGrid = (ship) => {
    const coords = ship.coords;
    for (let coord of coords) {
      const [x, y] = coord;
      grid[x][y] = "";
    }
  };

  const removeShip = (ship) => {
    removeShipFromShips(ship);
    removeShipFromGrid(ship);
  };

  const getCurrentDirection = (coords) => {
    const x = coords[0][0];
    const y = coords[1][0];

    return x === y ? "vertical" : "horizontal";
  };

  const getRootCoord = (coords) => {
    return Object.assign([], coords).sort()[0];
  };

  const calculateNewShipCoords = (ship) => {
    const coords = ship.coords;
    const length = coords.length;
    const direction = getCurrentDirection(coords);
    const [x, y] = getRootCoord(coords, direction);
    const newCoords = [];

    if (direction === "vertical") {
      // If a new tile will overlap the grid add it to the other side of the
      // root node instead. Offset distance counts each instance of overlapping
      // and then uses that value to place overlapping tiles
      let offset = 0;
      for (let i = 0; i < length; i++) {
        if (x + i > 9) {
          offset += 1;
          newCoords.push([x - offset, y]);
        } else {
          newCoords.push([x + i, y]);
        }
      }
    } else {
      let offset = 0;
      for (let i = 0; i < length; i++) {
        if (y + i > 9) {
          offset += 1;
          newCoords.push([x, y - offset]);
        } else {
          newCoords.push([x, y + i]);
        }
      }
    }

    return newCoords;
  };

  const rotateShip = (ship) => {
    if (ship.coords.length === 1) return true;

    const oldCoords = ship.coords;
    const newCoords = calculateNewShipCoords(ship);

    removeShip(ship);
    if (placeShip(...newCoords)) {
      ship.setCoords(newCoords);
      return true;
    } else {
      placeShip(...oldCoords);
      return false;
    }
  };

  const addMiss = (coord) => misses.push(coord);

  const receiveAttack = (coord) => {
    const [x, y] = coord;
    // If ship is at coords mark it hit, otherwise count as a miss
    grid[x][y] ? grid[x][y].hit(coord) : addMiss(coord);
  };

  const allSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  const generatePositions = (length) => {
    const random = () => Math.floor(Math.random() * 10);
    const vertical = random() >= 5 ? true : false;
    let x = random();
    let y = random();
    let coords = [];

    let offset = 0;
    for (let i = 0; i < length; i++) {
      if (vertical) {
        if (y + i > 9) {
          offset += 1;
          coords.push([x, y - offset]);
        } else {
          coords.push([x, y + i]);
        }
      } else {
        if (x + i > 9) {
          offset += 1;
          coords.push([x - offset, y]);
        } else {
          coords.push([x + i, y]);
        }
      }
    }

    while (spotsTaken(coords)) {
      coords = generatePositions(length);
    }
    return coords;
  };

  const clearShips = () => {
    while (ships.length) {
      ships.pop();
    }
  };

  const placeShipsRandomly = () => {
    clearGrid();
    clearShips();
    const lengths = [1, 1, 2, 2, 3, 4, 5];
    for (let length of lengths) {
      const coords = generatePositions(length);
      placeShip(...coords);
    }
  };

  const reset = () => {
    clearGrid();
    clearShips();
  };

  return {
    reset,
    placeShipsRandomly,
    generatePositions,
    getShipByCoord,
    rotateShip,
    placeShip,
    receiveAttack,
    allSunk,
    grid,
    removeShipFromShips,
    spotsTaken,
    getShips: () => ships,
    getMisses: () => misses,
  };
};

export default GameBoard;
