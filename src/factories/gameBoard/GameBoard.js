import ShipFactory from "./../ship/Ship";

const GameBoard = () => {
  const grid = buildGrid();
  const misses = [];

  function buildGrid() {
    let grid = [];
    for (let i = 0; i < 10; i++) {
      grid[i] = new Array(10);
    }
    return grid;
  }

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

  const placeShip = (...coords) => {
    const ship = ShipFactory(coords);

    // Prevent overlap
    if (spotsTaken(coords)) return false;

    for (let coord of coords) {
      setTile(coord, ship);
    }

    return true;
  };

  const addMiss = (coord) => misses.push(coord);

  const receiveAttack = (coord) => {
    const [x, y] = coord;
    // If ship is at coords mark it hit, otherwise count as a miss
    grid[x][y] ? grid[x][y].hit(coord) : addMiss(coord);
  };

  const allSunk = () => {
    return grid
      .flat()
      .filter((tile) => tile)
      .every((ship) => ship.isSunk());
  };

  return {
    placeShip,
    receiveAttack,
    allSunk,
    grid,
    getMisses: () => misses,
  };
};

export default GameBoard;
