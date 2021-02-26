import GameBoard from "./../gameBoard/GameBoard";

const Player = (cpu = false) => {
  const board = GameBoard();
  const attackList = [];
  const flatList = () => attackList.flatMap((coord) => coord.join(""));
  const addAttack = (coord) => attackList.push(coord);

  const playerAttack = (coord, board) => {
    if (flatList().includes(coord.join(""))) return false;

    board.receiveAttack(coord);
    addAttack(coord);
    return true;
  };

  const generateRandomTile = () => {
    const random = () => Math.floor(Math.random() * 10);
    let choice = [random(), random()];
    while (flatList().includes(choice.join(""))) {
      choice = [random(), random()];
    }

    return choice;
  };

  function getHits(attacks, ships, hits = []) {
    if (attacks.length === 0) return hits;

    const attack = attacks.pop();
    let ship = ships.filter((ship) => ship.hitCoords().includes(attack))[0];

    if (ship) hits.push(attack);
    return getHits(attacks, ships, hits);
  }

  const multiDimensionalUnique = (arr) => {
    let uniques = [];
    let itemsFound = {};
    for (let i = 0, l = arr.length; i < l; i++) {
      let stringified = JSON.stringify(arr[i]);
      if (itemsFound[stringified]) {
        continue;
      }
      uniques.push(arr[i]);
      itemsFound[stringified] = true;
    }
    return uniques;
  };

  const generateTileGuesses = (board) => {
    const attacks = Object.assign([], attackList);
    const ships = board.getShips();
    const hits = getHits(attacks, ships);
    const mostRecentHit = hits[0];
    const ship = ships.filter((ship) =>
      ship.hitCoords().includes(mostRecentHit)
    )[0];

    if (!mostRecentHit || ship.isSunk()) {
      return generateRandomTile();
    } else {
      let choices = [];
      hits.sort((firstHit, secondHit) => {
        const [x, y] = firstHit;
        const [a, b] = secondHit;

        if (x === a) {
          // Vertical ships
          choices.push(
            ...new Set([
              [x, y + 1],
              [x, y - 1],
              [a, b + 1],
              [a, b - 1],
            ])
          );
        }
        if (y === b) {
          // Horizontal ships
          choices.push(
            ...new Set([
              [x + 1, y],
              [x - 1, y],
              [a + 1, b],
              [a - 1, b],
            ])
          );
        }
      });

      const uniqueChoices = multiDimensionalUnique(choices).filter(
        (coord) => !hits.map((i) => i.join("")).includes(coord.join(""))
      );

      if (uniqueChoices.length !== 0) {
        // Filter out previous hits
        return uniqueChoices.filter((coord) => {
          return (
            coord[0] >= 0 && coord[1] >= 0 && coord[0] < 10 && coord[1] < 10
          );
        });
      } else {
        // Choosen tile above, below, to the left, or to the right (eg. plus sign)
        const [x, y] = hits[0];
        choices.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        const filteredChoices = choices.filter((coord) => {
          return (
            coord[0] >= 0 && coord[1] >= 0 && coord[0] < 10 && coord[1] < 10
          );
        });

        return filteredChoices.sort();
      }
    }
  };

  const cpuAttack = (board) => {
    const coords = generateTileGuesses(board);
    const idx = Math.floor(Math.random() * coords.length);

    let chosen = typeof coords[0] === "number" ? coords : coords[idx];
    playerAttack(chosen, board);
  };

  const attack = (coord, board) => {
    return cpu ? cpuAttack(board) : playerAttack(coord, board);
  };

  return {
    attack,
    attackList,
    board,
    generateTileGuesses,
  };
};

export default Player;
