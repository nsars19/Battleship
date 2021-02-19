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
});
