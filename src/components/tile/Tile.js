import styled from "styled-components";

const StyledTile = styled.div`
  display: grid;
  place-items: center;
  background: #78f;
  border: 1px solid #2223;
`;

const Tile = (props) => {
  const handleClick = (e) => {
    const [x, y] = props.id.split("");
    props.setGrid(x, y);

    e.target.innerText = "X"
  }

  return (
    <StyledTile onClick={handleClick}>{props.tile}</StyledTile>
  )
};

export default Tile;
