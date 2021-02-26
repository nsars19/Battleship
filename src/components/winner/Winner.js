import StyledWinner from "./StyledWinner";

const Winner = ({ winner, resetGame }) => {
  return (
    <StyledWinner>
      <h1>
        {winner}
        {winner === "PC" ? " wins!" : " win!"}
      </h1>
      <button onClick={resetGame}>Play Again</button>
    </StyledWinner>
  );
};

export default Winner;
