import styled from "styled-components";

const StyledBoard = styled.div`
  height: 400px;
  width: 400px;
  border: 2px solid #0004;
  display: grid;
  grid-template-columns: repeat(10, minmax(20px, 50px));
  grid-template-rows: repeat(10, minmax(20px, 50px));
`;

export default StyledBoard;
