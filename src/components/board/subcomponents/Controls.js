import StyledControls from "./StyledControls";
import rotateIcon from "./assets/rotate.webp";

const Controls = ({ boardStatus, shipsPlaced, rotateShip, shuffle }) => {
  const { boardComplete, setBoardComplete } = boardStatus;

  return (
    <StyledControls
      style={{
        display: boardComplete ? "none" : "flex",
      }}
    >
      <button onClick={rotateShip}>
        <img src={rotateIcon} alt={"rotate ship"} />
      </button>
      <button onClick={shuffle}>Place Ships</button>
      <button
        onClick={() => {
          if (shipsPlaced) setBoardComplete(true);
        }}
      >
        Start Game
      </button>
    </StyledControls>
  );
};

export default Controls;
