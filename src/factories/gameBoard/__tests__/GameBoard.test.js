import GameBoard from "./../GameBoard";

describe("GameBoard", () => {
  it("returns an object", () => {
    const board = GameBoard();
    expect(typeof board).toBe("object");
  });

  it("creates the grid properly", () => {
    const board = GameBoard();
    expect(board.grid.length).toBe(10);
    board.grid.forEach((row) => expect(row.length).toBe(10));
  });

  it("places ships properly", () => {
    const board = GameBoard();
    board.placeShip([0, 0]);
    expect(board.grid[0][0].length()).toBe(1);
    const secondShip = board.placeShip([0, 0], [1, 0]);
    expect(secondShip).toBe(false);
  });

  it("records misses", () => {
    const board = GameBoard();
    expect(board.getMisses().length).toBe(0);
    board.receiveAttack([0, 0]);
    expect(board.getMisses().length).toBe(1);
  });

  it("knows if all ships are sunk", () => {
    const board = GameBoard();
    board.placeShip([0, 0], [2, 6]);
    board.receiveAttack([0, 0]);
    board.receiveAttack([2, 6]);
    expect(board.allSunk()).toBe(true);
  });

  it("returns ship objects", () => {
    const board = GameBoard();
    board.placeShip([0, 0], [1, 0]);

    const coords = [
      [0, 0],
      [1, 0],
    ];
    expect(board.getShips()[0].coords).toEqual(coords);
  });

  it("rotates ships", () => {
    const board = GameBoard();
    const ship = board.placeShip([0, 0], [1, 0], [2, 0]);

    board.rotateShip(ship);
    // console.log(ship.coords);
    expect(ship.coords).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  it("rotates ships without overlapping grid", () => {
    const board = GameBoard();
    let ship = board.placeShip([7, 9], [8, 9], [9, 9]);

    board.rotateShip(ship);

    expect(ship.coords).toEqual([
      [7, 9],
      [7, 8],
      [7, 7],
    ]);
  });

  it("rotates ships without overlapping other ships", () => {
    const board = GameBoard();
    let ship = board.placeShip([0, 0], [1, 0], [2, 0], [3, 0]);
    board.placeShip([0, 1], [1, 1]);

    expect(board.rotateShip(ship)).toBe(false);
  });

  it("generates legal positions to place ships", () => {
    const board = GameBoard();
    const coords = board.generatePositions(3);

    coords.forEach((coord) => {
      const [x, y] = coord;
      expect(x).toBeLessThanOrEqual(9);
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(9);
      expect(y).toBeGreaterThanOrEqual(0);
    });
  });

  it("places ships only in spaces where not other ships are", () => {
    const board = GameBoard();

    for (let i = 0; i < 10; i++) {
      board.placeShip([i, 0], [i, 1], [i, 2], [i, 3], [i, 4]);
    }

    let coords = board.generatePositions(5);

    coords.forEach((coord) => {
      const y = coord[1];
      expect(y).toBeGreaterThan(4);
    });
  });

  it("places seven ships randomly on the board", () => {
    const board = GameBoard();
    board.placeShipsRandomly();

    expect(board.getShips().length).toBe(7);
  });
});
