import styled from "styled-components";

const StyledShip = styled.div`
  height: ${(props) => 40 * parseInt(props.length)}px;
  width: 40px;
  background: #222;
`;

const Ship = (props) => {
  const handleDrag = (e) => {
    console.log(e);
  };

  return (
    <StyledShip length={props.length} draggable={true} onDrag={handleDrag} />
  );
};

export default Ship;
