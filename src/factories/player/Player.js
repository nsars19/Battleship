import GameBoard from "./../gameBoard/GameBoard";

const Player = (cpu = false) => {
  const attackList = [];
  const flatList = () => attackList.flatMap((coord) => coord.join(""));
  const addAttack = (coord) => attackList.push(coord);

  const playerAttack = (coord, board) => {
    if (flatList().includes(coord.join(""))) return false;

    board.receiveAttack(coord);
    addAttack(coord);
    return true;
  };

  const cpuAttack = (coord, board) => {};

  const attack = (coord, board) => {
    return cpu ? cpuAttack(coord, board) : playerAttack(coord, board);
  };

  return {
    attack,
    attackList,
    board: GameBoard(),
  };
};

export default Player;
