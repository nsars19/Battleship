import ShipFactory from "./../Ship";

describe("ShipFactory", () => {
  it("returns an object", () => {
    const Ship = ShipFactory([[0, 0]]);
    expect(typeof Ship).toBe("object");
  });

  it("returns it's coordinates", () => {
    const Ship = ShipFactory([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
    expect(Ship.coords).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  it("returns the proper length", () => {
    const Ship = ShipFactory([
      [0, 0],
      [1, 0],
    ]);
    expect(Ship.length()).toBe(2);
  });

  it("stores hit coordinates", () => {
    const Ship = ShipFactory([[0, 0]]);
    Ship.hit = jest.fn((coords) => null);
    Ship.hit([0, 0]);
    expect(Ship.hit).toHaveBeenCalled();
  });

  it("is sunk when all coordinates are hit", () => {
    const Ship = ShipFactory([
      [0, 0],
      [1, 0],
    ]);
    Ship.hit([1, 0]);
    Ship.hit([0, 0]);
    expect(Ship.isSunk()).toBe(true);
  });

  it("is not sunk when only some coordinates are hit", () => {
    const Ship = ShipFactory([
      [2, 3],
      [3, 3],
      [4, 3],
    ]);
    Ship.hit([2, 3]);
    Ship.hit([4, 3]);
    expect(Ship.isSunk()).toBe(false);
  });
});
