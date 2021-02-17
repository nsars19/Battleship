import StyledTile from "./StyledTile";

const Tile = (props) => {
  const handleClick = (e) => {
    const [x, y] = props.id.split("");
    props.setGrid(x, y);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <StyledTile
      onClick={handleClick}
      onDrop={props.onDrop}
      onDragOver={handleDragOver}
      id={props.id}
    >
      {props.tile}
    </StyledTile>
  );
};

export default Tile;
