import StyledShip from "./StyledShip";

const Ship = (props) => {
  const handleDrag = (e) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("id", e.target.id);
    e.dataTransfer.setData("length", props.length);
  };

  return (
    <StyledShip
      length={props.length}
      draggable={true}
      onDragStart={handleDrag}
      id={props.id}
    />
  );
};

export default Ship;
