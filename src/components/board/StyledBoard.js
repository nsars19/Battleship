import styled from "styled-components";

const StyledBoard = styled.div`
  height: 280px;
  width: 280px;
  margin: 15px auto;
  display: grid;
  grid-template-columns: repeat(10, minmax(5px, 1fr));
  grid-template-rows: repeat(10, minmax(5px, 1fr));
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;

  @media (min-width: 540px) {
    & {
      width: 400px;
      height: 400px;
    }
  }

  @media (min-width: 768px) {
    & {
      width: 500px;
      height: 500px;
    }
  }
`;

export default StyledBoard;
