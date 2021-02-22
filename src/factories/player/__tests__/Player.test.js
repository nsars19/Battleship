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

  it("attacks near previously hit ships if a cpu player", () => {
    const player = Player();
    player.board.placeShip([0, 0], [1, 0], [2, 0], [3, 0]);
    player.attack([1, 0], player.board);
    const guesses = player.generateTileGuesses(player.board);
    const received = [
      [0, 0],
      [2, 0],
      [1, 1],
    ].sort();
    expect(guesses).toEqual(received);
  });

  it("cpu attacks in a line if two adjacent tiles are hit", () => {
    const player = Player();
    player.board.placeShip([0, 0], [1, 0], [2, 0], [3, 0]);
    player.attack([1, 0], player.board);
    player.attack([2, 0], player.board);
    const guesses = player.generateTileGuesses(player.board);
    const received = [
      [0, 0],
      [3, 0],
    ];
    expect(guesses).toEqual(received);
  });

  it("cpu guesses a random tile if the last ship hit was sunk", () => {
    const player = Player();
    player.board.placeShip([1, 0]);
    player.attack([0, 0], player.board);

    const guesses = [];
    for (let i = 0; i < 99; i++) {
      guesses.push(player.generateTileGuesses(player.board));
    }

    guesses.forEach((guess) => expect(guess).not.toEqual([0, 0]));
  });

  it("cpu doesn't select previouly chosen tiles", () => {
    const player = Player();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (i === 0 && j === 0) continue;
        player.attack([i, j], player.board);
      }
    }
    const guess = player.generateTileGuesses(player.board);
    expect(guess).toEqual([0, 0]);
  });

  it("cpu player generates a random attack", () => {
    const player = Player(true);
    player.attack(null, player.board);

    expect(player.attackList.length).toBe(1);
  });
});
