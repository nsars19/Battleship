import Player from "./../Player";

describe("Player", () => {
  it("returns an object", () => {
    const player = Player();
    expect(typeof player).toBe("object");
  });

  it("is able to attack board tiles", () => {
    const player = Player();
    const receiveAttack = (player.board.receiveAttack = jest.fn());

    player.attack([0, 0], player.board);

    expect(receiveAttack).toBeCalledWith([0, 0]);
  });

  it("doesn't allow tiles to be attacked multiple times", () => {
    const player = Player();
    let attacked = true;

    for (let _ in [1, 2]) {
      attacked = player.attack([0, 0], player.board);
    }

    expect(attacked).toBe(false);
  });
});
