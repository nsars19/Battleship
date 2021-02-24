import StyledControls from "./StyledControls";
import rotateIcon from "./assets/rotate.webp";

const Controls = (props) => {
  const { boardComplete, setBoardComplete } = props.boardStatus;
  const shipsPlaced = props.shipStatus;

  return (
    <StyledControls>
      <button onClick={props.rotateShip}>
        <img src={rotateIcon} alt={"rotate ship"} />
      </button>
      <button onClick={props.shuffle}>Place Ships</button>
      <button
        onClick={() => {
          console.log({ boardComplete, shipsPlaced });
          if (shipsPlaced) setBoardComplete(true);
        }}
      >
        Start Game
      </button>
    </StyledControls>
  );
};

export default Controls;
