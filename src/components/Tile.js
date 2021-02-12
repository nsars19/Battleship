import styled from "styled-components";

const StyledTile = styled.div`
  display: grid;
  place-items: center;
  background: #78f;
  border: 1px solid #2223;
`;

const Tile = (props) => {
  const handleClick = () => {
    const [x, y] = props.id.split("");
    console.log(x, y)
  }

  return (
    <StyledTile onClick={handleClick}>{props.tile}</StyledTile>
  )
};

export default Tile;
